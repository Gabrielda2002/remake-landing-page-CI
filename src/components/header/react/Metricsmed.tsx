import { useTranslation } from "@/hooks/useTranslation";
import { FloatingWindowContent } from "../../ui/FloatingWindowContent"
import metricsmed from '@logo/metricsmed.webp'
import { translationFloatingContent } from "@/data/translationFloatingContent";

const TITLE = "METRICSMED"

const WEBSITE = "https://metricsmed.com/";

export function Metricsmed(){
  const { t } = useTranslation(translationFloatingContent);
  
  return(
    <FloatingWindowContent
      image={metricsmed.src}
      title={TITLE}
      information={t("metricsmed.info")}
      titleWebsite={t("metricsmed.titleWebside")}
      website={WEBSITE}
    />
  )
}