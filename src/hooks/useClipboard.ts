import { useCallback, useState } from "react";
import useToastHook from "./useToastHook";

interface ClipboardOptions {
  success?: string;
  error?: string;
}

function useClipboard(text: string, options?: ClipboardOptions) {
  const { success, error } = useToastHook();
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          setHasCopied(true);
          success({ message: options?.success || "Texto copiado" });
          setTimeout(() => setHasCopied(false), 2000);
        },
        (err) => {
          console.error("Failed to copy text: ", err);
          error({ message: options?.error || "Falha ao copiar o texto" });
        }
      );
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        error({ message: options?.error || "Falha ao copiar o texto" });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [error, options, success, text]);

  return { hasCopied, onCopy };
}

export default useClipboard;
