import NavidadLanding, { RUTA_NAVIDAD } from "@/components/NavidadLanding";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const N = OFERTAS.navidad;

// Regenera cada hora: las noches pasadas desaparecen solas.
export const revalidate = 3600;

// URL estable sin año: cada campaña actualiza el año en lib/sitio.ts → OFERTAS.navidad y las fechas en data/navidad.json.
export const metadata = meta({
  titulo: `Cenas de empresa de Navidad en A Coruña ${N.anio} · Cena, show y baile · Los7pc`,
  descripcion: `Cena de empresa de Navidad en A Coruña: cena con bebida, show cómico y DJ hasta las 3 en el ${SEDE.nombre}. Para equipos de 6 a 80+, también comidas y en exclusiva. Guía para organizarla.`,
  ruta: RUTA_NAVIDAD,
  imagen: FOTOS.navidad.src,
});

export default function Navidad() {
  return <NavidadLanding variante="generica" />;
}
