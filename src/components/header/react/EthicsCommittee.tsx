import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import caimedlogo from '@logo/caimedlogo.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const WEBSITE = "https://caimed.com/comite-de-etica/";

const ADDRESS = "Carrera 42A N°17-50, Bogotá D.C";
const PHONE = "350 318 9822";
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
      image={caimedlogo.src}
      title= {t("ethicsCommittee.title")}
      information = {info}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
    />
  );
}