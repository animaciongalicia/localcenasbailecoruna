import NavidadLanding, { RUTA_NAVIDAD } from "@/components/NavidadLanding";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const N = OFERTAS.navidad;

// Regenera cada hora: las noches pasadas desaparecen solas.
export const revalidate = 3600;

// URL estable sin año: cada campaña actualiza el año en lib/sitio.ts → OFERTAS.navidad y las fechas en data/navidad.json.
export const metadata = meta({
  titulo: `Cenas de Navidad en A Coruña ${N.anio}: cena, show y baile · Los7pc`,
  descripcion: `Cenas de Navidad para empresas y grupos en el ${SEDE.nombre}: cena con bebida, show cómico y DJ hasta las 3. ${N.precio} € por persona. Noches de ${N.temporada}.`,
  ruta: RUTA_NAVIDAD,
  imagen: FOTOS.salon.src,
});

export default function Navidad() {
  return <NavidadLanding variante="generica" />;
}
