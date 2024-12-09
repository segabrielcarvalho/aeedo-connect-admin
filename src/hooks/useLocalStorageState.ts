import { useCallback, useEffect, useState } from "react";

interface IUseLocalStorageStateParams<T> {
  /**
   * A chave do item a ser gerenciado no Local Storage.
   */
  key: string;

  /**
   * Valor inicial do estado.
   */
  initialValue: T;

  /**
   * Define se o estado deve ser salvo ou não no Local Storage. Por padrão é `true`.
   */
  saveToLocalStorage?: boolean;
}

type IUseLocalStorageState<T> = [
  T,
  (newValue: T, serializeDataToLocalStorageFn?: (data: T) => T) => void
];

/**
 * Hook personalizado para gerenciar estados armazenados no Local Storage do navegador.
 * @returns [state, setState] - O valor atual do estado e uma função para atualizá-lo.
 */
const useLocalStorageState = function <T>({
  key,
  initialValue,
  saveToLocalStorage = true,
}: IUseLocalStorageStateParams<T>): IUseLocalStorageState<T> {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (!saveToLocalStorage) return;

    try {
      const savedState = localStorage.getItem(key);
      if (savedState) {
        setState(JSON.parse(savedState) as T);
      }
    } catch (error) {
      console.error(`Erro ao ler o localStorage para a chave "${key}":`, error);
    }
  }, [key, saveToLocalStorage]);

  const updateState = useCallback(
    (newValue: T, serializeDataToLocalStorageFn?: (data: T) => T) => {
      setState(newValue);

      if (!saveToLocalStorage) return;

      try {
        if (newValue === null || newValue === undefined) {
          localStorage.removeItem(key);
        } else {
          const dataToSave = serializeDataToLocalStorageFn
            ? serializeDataToLocalStorageFn(newValue)
            : newValue;
          localStorage.setItem(key, JSON.stringify(dataToSave));
        }
      } catch (error) {
        console.error(
          `Erro ao salvar no localStorage para a chave "${key}":`,
          error
        );
      }
    },
    [key, saveToLocalStorage]
  );

  return [state, updateState];
};

export default useLocalStorageState;
