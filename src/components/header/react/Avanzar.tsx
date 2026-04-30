import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import avanzar from '@logo/avanzar.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const WEBSITE = "https://avanzar.com.co/";

export function Avanzar(){
  const { t } = useTranslation(translationFloatingContent);
  
  return(
    <FloatingWindowContent 
      image={avanzar.src}
      title={t("avanzar.title")}
      text={t("avanzar.text")}
      titleWebsite={t("avanzar.titleWebside")}
      website={WEBSITE}
    />
  )
}