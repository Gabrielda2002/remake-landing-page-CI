import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface ModalOptions {
  title?: string,
  text?: string,
  children?: ReactNode,
  size?: "default" | "large" | "xlarge"
}

const sizeClasses: Record<NonNullable<ModalOptions["size"]>, string> = {
  default: "w-[min(60vw,400px)] min-w-125",
  large:   "w-[min(75vw,600px)] min-w-150",
  xlarge:  "w-[min(90vw,900px)] min-w-175",
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
      className="fixed inset-0 flex items-center justify-center z-9999 backdrop-blur-xs bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl max-h-[200vh] flex flex-col ${sizeClasses[content.size ?? "default"]}`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <span className="font-semibold">{content.title}</span>
          <button onClick={close} className="text-lg cursor-pointer bg-transparent border-none">✕</button>
        </div>

        <div className="p-5 overflow-y-auto text-[10px]">
          {content.text && <p className="whitespace-pre-wrap">{content.text}</p>}
          {content.children}
        </div>
      </div>
    </div>
  );

  return { open, close, modal };
}