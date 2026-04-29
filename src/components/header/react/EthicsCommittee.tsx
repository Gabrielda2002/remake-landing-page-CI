import { FloatingWindowContent } from "../../ui/FloatingWindowContent";
import caimedlogo from '@logo/caimedlogo.webp'


const TILTE = " Comité de Ética en la Investigación CAIMED";

const information = [
  "Dirección: Carrera 42A N°17-50, Bogotá D.C",
  "Teléfono: 350 318 9822",
  "Email: comitedeetica@caimed.com",
]

const titleWebside = "Conoce más de CAIMED";
const website = "https://caimed.com/comite-de-etica/";


export function EthicsCommittee() {
  return (
    <FloatingWindowContent
      image={caimedlogo.src}
      title= {TILTE}
      information = {information}
      titleWebsite={titleWebside}
      website={website}
    />
  );
}