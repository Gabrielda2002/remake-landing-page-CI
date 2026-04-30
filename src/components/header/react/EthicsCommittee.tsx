import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import caimedlogo from '@logo/caimedlogo.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const TILTE = "Comité de Ética en la Investigación CAIMED";

const information = [
  "Dirección: Carrera 42A N°17-50, Bogotá D.C",
  "Teléfono: 350 318 9822",
  "Email: comitedeetica@caimed.com",
]

const website = "https://caimed.com/comite-de-etica/";

export function EthicsCommittee() {

  const { t } = useTranslation(translationFloatingContent);

  return (
    <FloatingWindowContent
      image={caimedlogo.src}
      title= {t("ethicsCommittee.title")}
      information = {t("ethicsCommittee.info")}
      titleWebsite={t("ethicsCommittee.titleWebside")}
      website={website}
    />
  );
}