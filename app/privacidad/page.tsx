import type { Metadata } from "next";
import PaginaLegal from "@/components/PaginaLegal";
import { CONTACTO, LEGAL } from "@/lib/sitio";

export const metadata: Metadata = { title: "Política de privacidad · Los7pc", alternates: { canonical: "/privacidad/" }, robots: { index: false, follow: true } };

// Pendiente de revisión por la asesoría (RGPD + LOPDGDD).
export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad">
      <h2>Responsable</h2>
      <p>{LEGAL.titular} · CIF {LEGAL.nif} · {LEGAL.domicilio} · Tel. {CONTACTO.telefono} · <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p>
      <h2>Qué datos se tratan</h2>
      <p>
        El formulario de esta web <strong>no envía ni guarda datos en ningún servidor</strong>: solo prepara un mensaje en tu
        navegador. Si decides enviarlo por WhatsApp, email o llamar, se tratan los datos que tú facilites (nombre, teléfono,
        fecha, número de personas y detalles de la celebración).
      </p>
      <h2>Para qué</h2>
      <ul>
        <li>Responder a tu consulta y, si lo pides, gestionar la reserva.</li>
        <li>Medir el uso de la web y de los anuncios, solo si aceptas las cookies correspondientes. Estas mediciones no incluyen tu nombre, teléfono ni el contenido de tu mensaje.</li>
      </ul>
      <h2>Base legal</h2>
      <p>Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y, para la analítica y publicidad, tu consentimiento (art. 6.1.a RGPD).</p>
      <h2>Conservación</h2>
      <p>El tiempo necesario para atender la consulta y, si hay reserva, durante los plazos legales aplicables.</p>
      <h2>Destinatarios</h2>
      <p>
        No se ceden datos a terceros salvo obligación legal. Proveedores que pueden intervenir: alojamiento web (Vercel), Google
        (analítica y publicidad, con consentimiento), Meta (si escribes por WhatsApp o aceptas cookies de publicidad). Pueden
        implicar transferencias internacionales amparadas en las garantías del RGPD.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>.
        Puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
    </PaginaLegal>
  );
}
