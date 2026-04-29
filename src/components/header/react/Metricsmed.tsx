import { FloatingWindowContent } from "../../ui/FloatingWindowContent"
import metricsmed from '@logo/metricsmed.webp'

const TITLE = "METRICSMED "

const INFO = [
  "Radicación y consulta durante las 24 horas del día",
  "Que  el centro de investigación  y el comité de ética tengan un funcionamiento eficaz y activo para la revisión, y seguimiento de proyectos.",
  "Reducción de los tiempos de respuesta entre la radicación de solicitudes y la emisión de conceptos por parte del comité, promoviendo una interacción más eficiente entre los centros de investigación y el comité de ética"
]

const TITLE_WEBSIDE = "Conoce más de METRICSMED";

const WEBSITE = "https://metricsmed.com/";

export function Metricsmed(){
  return(
    <FloatingWindowContent
      image={metricsmed.src}
      title={TITLE}
      information={INFO}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
      />
  )
}