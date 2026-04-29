import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import avanzar from '@logo/avanzar.webp'

const TITLE = "Asociación para el avance de la investigación clínica en Colombia.";

const TEXT = "la Asociación para el Avance de la Investigación Clínica (IC) en Colombia, es una entidad científica sin ánimo de lucro, que desde 1999, a través de la educación no continuada y otras acciones, incentiva, favorece, propicia, asesora, facilita y contribuye al desarrollo de la Investigación Clínica (IC) en el país."

const TITLE_WEBSIDE = "Conoce más de AVANZAR";

const WEBSITE = "https://avanzar.com.co/";

export function Avanzar(){
  return(
    <FloatingWindowContent 
      image={avanzar.src}
      title={TITLE}
      text={TEXT}
      titleWebsite={TITLE_WEBSIDE}
      website={WEBSITE}
    />
  )
}