import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useFloatingModal, type ModalOptions } from "@/hooks/useFloatingModal";
import { EthicsCommittee } from "./EthicsCommittee";
import { Metricsmed } from "./Metricsmed";
import { Avanzar } from "./Avanzar";

type ModalEntry = {
  title?: string;
  component: ReactNode;
  size?: ModalOptions["size"];
};

const contentMap: Record<string, ModalEntry> = {
  "ethics-committee": {
    title: "Comité Ético",
    component: <EthicsCommittee/>,
    size: "large"
  },
  
  metricsmed: {
    title: "METRICSMED",
    component: <Metricsmed/>,
    size: "large"
  },
  
  avanzar: {
    title: "AVANZAR",
    component: <Avanzar/>,
    size: "large"
  },
};

export function ModalPortal() {
  const { open, modal } = useFloatingModal();
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const { modalId } = (e as CustomEvent<{ modalId: string }>).detail;
      const entry = contentMap[modalId];
      if (!entry) return;
      openRef.current({
        title: entry.title,
        children: entry.component,
        size: entry.size,
      });
    };

    document.addEventListener("open-floating-modal", handleOpen);
    return () => document.removeEventListener("open-floating-modal", handleOpen);
  }, []);

  return <>{modal}</>;
}
