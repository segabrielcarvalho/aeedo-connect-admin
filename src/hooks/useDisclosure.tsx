import { useCallback, useState } from "react";

/**
 * useDisclosure hook para controlar o estado de abertura e fechamento de elementos como modais e dropdowns.
 *
 * @returns {Object} Um objeto contendo:
 *  - isOpen: Estado booleano indicando se o elemento está aberto ou fechado.
 *  - onOpen: Função para abrir o elemento.
 *  - onClose: Função para fechar o elemento.
 *  - onToggle: Função para alternar entre abrir e fechar o elemento.
 */
const useDisclosure = () => {
  // Estado que indica se o elemento está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Função para abrir o elemento.
   * Usa useCallback para memorizar a função e evitar recriação em re-renderizações.
   */
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Função para fechar o elemento.
   * Usa useCallback para memorizar a função e evitar recriação em re-renderizações.
   */
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Função para alternar entre abrir e fechar o elemento.
   * Usa useCallback para memorizar a função e evitar recriação em re-renderizações.
   */
  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Retorna o estado e as funções de controle
  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
