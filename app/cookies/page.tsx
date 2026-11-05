import type { Metadata } from "next";
import PaginaLegal from "@/components/PaginaLegal";
import BotonConfigCookies from "@/components/BotonConfigCookies";
import { CONTACTO, LEGAL } from "@/lib/sitio";

export const metadata: Metadata = { title: "Política de cookies · Los7pc", alternates: { canonical: "/cookies/" }, robots: { index: false, follow: true } };

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies">
      <p>
        Esta web usa cookies técnicas y, solo si las aceptas, cookies de analítica y publicidad. Puedes cambiar tu elección en
        cualquier momento.
      </p>
      <div className="font-semibold text-acento"><BotonConfigCookies /></div>
      <h2>Cookies que se usan</h2>
      <ul>
        <li><strong>Técnicas (propias):</strong> <code>l7pc_consent_v1</code> en el almacenamiento local del navegador, para recordar tu elección.</li>
        <li><strong>Analítica (Google Analytics 4):</strong> <code>_ga</code>, <code>_ga_*</code>. Solo con tu consentimiento.</li>
        <li><strong>Publicidad (Google Ads):</strong> <code>_gcl_au</code> y similares. Solo con tu consentimiento y si la medición de anuncios está activa.</li>
        <li><strong>Publicidad (Meta):</strong> <code>_fbp</code>, <code>_fbc</code>. Solo con tu consentimiento y si el píxel está activo.</li>
      </ul>
      <h2>Modo de consentimiento</h2>
      <p>Se aplica el Modo de consentimiento v2 de Google: todo denegado por defecto hasta que aceptes. Ninguna etiqueta se carga antes.</p>
      <h2>Responsable</h2>
      <p>{LEGAL.titular} · CIF {LEGAL.nif} · <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p>
    </PaginaLegal>
  );
}
