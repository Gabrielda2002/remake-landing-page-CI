import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import caimedlogoactualizado from '@logo/caimedlogoactualizado.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const WEBSITE = "https://caimed.com/comite-de-etica/";

const ADDRESS = "Carrera 4 Este N.° 24-65 Chía, Cundinamarca.";
const PHONE = "(+57) 316 741 6771";
const EMAIL = "Email: comitedeetica@caimed.com";
const TITLE = "CAIMED";

export function EthicsCommittee() {
  const { t } = useTranslation(translationFloatingContent);
  
  const info = [
    `${t("ethicsCommittee.info.address")}: ${ADDRESS}`,
    `${t("ethicsCommittee.info.phone")}: ${PHONE}`,
    `${EMAIL}`,
  ];
  
  const TITLE_WEBSIDE = `${t("titleWebside")} ${TITLE}`;
  
  return (
    <FloatingWindowContent
      image={caimedlogoactualizado.src}
      title= {t("ethicsCommittee.title")}
      information = {info}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
    />
  );
}