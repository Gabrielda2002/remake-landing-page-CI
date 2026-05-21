import { FloatingWindowContent } from "@/components/ui/FloatingWindowContent";
import { translationFloatingContent } from "@/data/translationFloatingContent";
import { useTranslation } from "@/hooks/useTranslation";
import aciclogo from '@logo/aciclogo.webp'

const TITLE = "ACIC";
const WEBSITE = "https://aciccolombia.org/";

export function Acic(){
  const { t } = useTranslation(translationFloatingContent);
  const TITLE_WEBSIDE = `${t("titleWebside")} ${TITLE}`;

  return(
    <FloatingWindowContent
      image={aciclogo.src}
      title={t("acic.title")}
      text={t("acic.text")}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
    />
  )
}