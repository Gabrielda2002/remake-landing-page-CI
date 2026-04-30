import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useFloatingModal, type ModalOptions } from "@/hooks/useFloatingModal";
import { EthicsCommittee } from "./EthicsCommittee";
import { Metricsmed } from "./Metricsmed";
import { Avanzar } from "./Avanzar";
import { useTranslation } from "@/hooks/useTranslation";
import { translationFloatingContent } from "@/data/translationFloatingContent";

type ModalEntry = {
  title?: string;
  component: ReactNode;
  size?: ModalOptions["size"];
};

export function ModalPortal() {
  const { open, modal } = useFloatingModal();
  const { t } = useTranslation(translationFloatingContent);

    const contentMap: Record<string, ModalEntry> = {
    "ethics-committee": {
      title: t("modals.ethicsCommittee"),
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

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const { modalId } = (e as CustomEvent<{ modalId: string }>).detail;
      const entry = contentMap[modalId];
      if (!entry) return;
      open({
        title: entry.title,
        children: entry.component,
        size: entry.size,
      });
    };

    document.addEventListener("open-floating-modal", handleOpen);
    return () => document.removeEventListener("open-floating-modal", handleOpen);
  }, [t]);

  return <>{modal}</>;
}
