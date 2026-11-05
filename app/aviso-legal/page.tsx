import type { Metadata } from "next";
import PaginaLegal from "@/components/PaginaLegal";
import { CONTACTO, LEGAL, SITE_URL } from "@/lib/sitio";

export const metadata: Metadata = { title: "Aviso legal · Los7pc", alternates: { canonical: "/aviso-legal/" }, robots: { index: false, follow: true } };

// Pendiente de revisión por la asesoría (LSSI-CE). Falta el domicilio social completo.
export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal">
      <h2>Titular de la web</h2>
      <ul>
        <li>Titular: {LEGAL.titular}</li>
        <li>CIF: {LEGAL.nif}</li>
        <li>Domicilio: {LEGAL.domicilio}</li>
        <li>Nombre comercial: {LEGAL.nombreComercial}</li>
        <li>Teléfono: {CONTACTO.telefono} · Email: <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></li>
        <li>Web: {SITE_URL.replace("https://", "")}</li>
      </ul>
      <h2>Objeto</h2>
      <p>
        Esta web informa sobre las cenas con show cómico y baile que organiza {LEGAL.nombreComercial} en A Coruña y permite
        preparar una consulta de disponibilidad. Las consultas enviadas por WhatsApp, teléfono o email no constituyen una
        reserva: la reserva se confirma únicamente tras recibir las condiciones por escrito y realizar el pago de confirmación.
      </p>
      <h2>Precios</h2>
      <p>
        Los precios publicados indican la campaña y temporada a la que se aplican. Las celebraciones a medida se presupuestan de
        forma personalizada.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, imágenes y diseño de esta web pertenecen a su titular o se usan con autorización. No se permite su reproducción sin permiso.</p>
      <h2>Responsabilidad</h2>
      <p>El titular no se hace responsable del contenido de las webs externas enlazadas desde este sitio.</p>
      <h2>Legislación</h2>
      <p>Se aplica la legislación española. Para cualquier controversia, los juzgados y tribunales de A Coruña, salvo que la normativa de consumidores disponga otra cosa.</p>
    </PaginaLegal>
  );
}
