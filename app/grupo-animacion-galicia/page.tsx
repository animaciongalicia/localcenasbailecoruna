import Link from "next/link";
import { Migas, Seccion, Titulo } from "@/components/Bloques";
import { IconoFlecha } from "@/components/Iconos";
import { JsonLdMigas, ORG_ID } from "@/components/JsonLd";
import { meta } from "@/lib/seo";
import { GRUPO, MARCA, SITE_URL } from "@/lib/sitio";

const RUTA = "/grupo-animacion-galicia/";

export const metadata = meta({
  titulo: `${GRUPO.nombre}: marcas para celebrar en Galicia · Los7pc`,
  descripcion: `Los7pc forma parte de ${GRUPO.nombre}: despedidas, eventos de empresa, experiencias en el mar, traslados con chófer y viajes por Galicia.`,
  ruta: RUTA,
});

export default function Grupo() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: MARCA.nombre,
    parentOrganization: { "@type": "Organization", name: GRUPO.nombre },
    url: `${SITE_URL}/`,
  };
  return (
    <>
      <Migas actual={GRUPO.nombre} />
      <Seccion className="!pt-10">
        <Titulo
          as="h1"
          ante="El grupo"
          titulo={GRUPO.nombre}
          texto={`Los7pc es la parte de las cenas baile. El grupo tiene más marcas para que una celebración no se quede en la cena: antes, después y alrededor.`}
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {GRUPO.marcas.map((m) => (
            <li key={m.url}>
              <a href={m.url} rel="noopener" className="tarjeta group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:border-acento">
                <span>
                  <span className="antetitulo">{m.tipo}</span>
                  <span className="mt-2 block font-serif text-2xl font-semibold group-hover:text-acento">{m.nombre}</span>
                  <span className="mt-2 block leading-relaxed text-tinta-suave">{m.texto}</span>
                  <span className="mt-3 block text-sm font-semibold text-acento">{m.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                </span>
                <IconoFlecha className="mt-1 h-6 w-6 shrink-0 text-acento" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-tinta-suave">
          ¿Lo que buscas es la cena con show y baile? <Link href="/" className="enlace">Vuelve a Los7pc</Link>.
        </p>
      </Seccion>
      <JsonLdMigas nombre={GRUPO.nombre} ruta={RUTA} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }} />
    </>
  );
}
