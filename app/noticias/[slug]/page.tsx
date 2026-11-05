import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaFinal } from "@/components/Bloques";
import { ORG_ID } from "@/components/JsonLd";
import { FOTOS } from "@/lib/fotos";
import { POSTS, fechaPost, getPost } from "@/lib/noticias";
import { meta } from "@/lib/seo";
import { SITE_URL } from "@/lib/sitio";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return meta({ titulo: `${p.titulo} · Los7pc`, descripcion: p.descripcion, ruta: `/noticias/${p.slug}/`, imagen: FOTOS.baile.src });
}

export default async function Articulo({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const otros = POSTS.filter((x) => x.slug !== p.slug).slice(0, 2);
  const url = `${SITE_URL}/noticias/${p.slug}/`;
  const datos = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.titulo,
      description: p.descripcion,
      datePublished: p.fecha,
      dateModified: p.fecha,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: url,
      image: [`${SITE_URL}${FOTOS.baile.src}`],
      inLanguage: "es-ES",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Noticias", item: `${SITE_URL}/noticias/` },
        { "@type": "ListItem", position: 3, name: p.titulo, item: url },
      ],
    },
  ];

  return (
    <>
      <nav aria-label="Migas de pan" className="border-b border-linea">
        <ol className="contenedor flex flex-wrap items-center gap-2 py-3 text-sm text-tinta-suave">
          <li><Link href="/" className="hover:text-acento">Inicio</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/noticias/" className="hover:text-acento">Noticias</Link></li>
        </ol>
      </nav>
      <article className="contenedor max-w-3xl py-12 sm:py-16">
        <p className="antetitulo">{p.categoria}</p>
        <h1 className="mt-3 font-serif text-[2.2rem] font-semibold leading-tight sm:text-5xl">{p.titulo}</h1>
        <p className="mt-4 text-lg text-tinta-suave">{p.descripcion}</p>
        <p className="mt-4 text-sm text-tinta-suave"><time dateTime={p.fecha}>{fechaPost(p.fecha)}</time> · {p.lectura} min de lectura</p>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-tinta/90">
          {p.bloques.map((b, i) => {
            switch (b.tipo) {
              case "p":
                return <p key={i}>{b.texto}</p>;
              case "h2":
                return <h2 key={i} className="pt-4 font-serif text-2xl font-semibold text-tinta sm:text-3xl">{b.texto}</h2>;
              case "lista":
                return <ul key={i} className="lista-check space-y-2">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
              case "cita":
                return <blockquote key={i} className="border-l-4 border-acento py-2 pl-5 font-serif text-2xl font-semibold text-tinta">{b.texto}</blockquote>;
              case "cta":
                return (
                  <div key={i} className="tarjeta mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-tinta">{b.texto}</p>
                    <Link href={b.href} className="btn-principal shrink-0">{b.boton}</Link>
                  </div>
                );
            }
          })}
        </div>
        {otros.length > 0 && (
          <aside className="mt-14 border-t border-linea pt-8">
            <h2 className="font-serif text-2xl font-semibold">Sigue leyendo</h2>
            <ul className="mt-4 space-y-3">
              {otros.map((o) => (
                <li key={o.slug}><Link href={`/noticias/${o.slug}/`} className="enlace">{o.titulo}</Link></li>
              ))}
            </ul>
          </aside>
        )}
      </article>
      <CtaFinal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }} />
    </>
  );
}
