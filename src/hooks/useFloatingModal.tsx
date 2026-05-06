import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface ModalOptions {
  title?: string,
  text?: string,
  children?: ReactNode,
  size?: "default" | "large" | "xlarge"
}

const sizeClasses: Record<NonNullable<ModalOptions["size"]>, string> = {
  default: "w-[calc(100%-2rem)] sm:w-[90vw] md:w-[70vw] lg:w-[600px] max-w-[600px]",
  large:   "w-[calc(100%-2rem)] sm:w-[90vw] md:w-[80vw] lg:w-[800px] max-w-[800px]",
  xlarge:  "w-[calc(100%-2rem)] sm:w-[95vw] md:w-[90vw] lg:w-[1000px] max-w-[1000px]",
};

export function useFloatingModal() {
  const [content, setContent] = useState<ModalOptions | null>(null);

  //Metodo para que no funcione el scroll fuera
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !!content);
    return () => document.body.classList.remove("overflow-hidden");
  }, [content]);

  const open = (options: ModalOptions) => setContent(options);
  const close = () => setContent(null);

  const modal = content && (
    <div
      onClick={close}
      className="fixed inset-0 flex items-center justify-center z-9999 backdrop-blur-xs bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col ${sizeClasses[content.size ?? "default"]}`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 shrink-0">
          <span className="font-semibold text-base sm:text-lg text-gray-900">{content.title}</span>
          <button 
            onClick={close} 
            className="text-2xl sm:text-3xl leading-none cursor-pointer bg-transparent border-none text-gray-500 hover:text-gray-900 transition-colors p-1 -mr-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto text-sm sm:text-base leading-relaxed text-gray-700">
          {content.text && <p className="whitespace-pre-wrap">{content.text}</p>}
          {content.children}
        </div>
      </div>
    </div>
  );

  return { open, close, modal };
}