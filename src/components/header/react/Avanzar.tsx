import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import avanzar from '@logo/avanzar.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const WEBSITE = "https://avanzar.com.co/";
const TITLE = "AVANZAR"

export function Avanzar(){
  const { t } = useTranslation(translationFloatingContent);
  const TITLE_WEBSIDE = `${t("titleWebside")} ${TITLE}`;

  return(
    <FloatingWindowContent 
      image={avanzar.src}
      title={t("avanzar.title")}
      text={t("avanzar.text")}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
    />
  )
}