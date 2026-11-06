import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaFinal } from "@/components/Bloques";
import BarraNoticias from "@/components/BarraNoticias";
import { IconoFlecha, IconoWhatsapp } from "@/components/Iconos";
import { ORG_ID } from "@/components/JsonLd";
import { FOTOS } from "@/lib/fotos";
import { fechaPost, getPost, postsOrdenados } from "@/lib/noticias";
import Image from "next/image";
import TextoEnlazado from "@/components/TextoEnlazado";
import { meta } from "@/lib/seo";
import { SITE_URL } from "@/lib/sitio";

// Programados: los artículos con fecha futura no existen hasta su día (la página se regenera cada hora).
export const revalidate = 3600;
export const dynamicParams = true;
export const generateStaticParams = () => postsOrdenados().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return meta({ titulo: p.titulo.length > 52 ? p.titulo : `${p.titulo} · Los7pc`, descripcion: p.descripcion, ruta: `/noticias/${p.slug}/`, imagen: (p.foto ?? FOTOS.baile).src });
}

export default async function Articulo({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const lista = postsOrdenados();
  const i = lista.findIndex((x) => x.slug === p.slug);
  const siguiente = lista[i - 1]; // más reciente
  const anterior = lista[i + 1]; // más antiguo
  const foto = p.foto ?? FOTOS.baile;
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
      image: [`${SITE_URL}${foto.src}`],
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
      <div className="contenedor grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article className="max-w-3xl">
        <p className="antetitulo">{p.categoria}</p>
        <h1 className="mt-3 font-serif text-[2.2rem] font-semibold leading-tight sm:text-5xl">{p.titulo}</h1>
        <p className="mt-4 text-lg text-tinta-suave">{p.descripcion}</p>
        <p className="mt-4 text-sm text-tinta-suave"><time dateTime={p.fecha}>{fechaPost(p.fecha)}</time> · {p.lectura} min de lectura</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-arena">
          <Image src={foto.src} alt={foto.alt} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        </div>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-tinta/90">
          {p.bloques.map((b, i) => {
            switch (b.tipo) {
              case "p":
                return <p key={i}><TextoEnlazado texto={b.texto} /></p>;
              case "h2":
                return <h2 key={i} className="pt-4 font-serif text-2xl font-semibold text-tinta sm:text-3xl">{b.texto}</h2>;
              case "lista":
                return <ul key={i} className="lista-check space-y-2">{b.items.map((it) => <li key={it}><TextoEnlazado texto={it} /></li>)}</ul>;
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
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-linea pt-6">
          <span className="text-sm font-semibold">¿Te has reído? Compártelo con quien organiza:</span>
          <a href={`https://wa.me/?text=${encodeURIComponent(`${p.titulo} ${url}`)}`} className="btn-wa min-h-[40px] px-4 text-sm" target="_blank" rel="noopener"><IconoWhatsapp className="h-4 w-4" /> Enviar por WhatsApp</a>
        </div>
        <nav aria-label="Más artículos" className="mt-8 grid gap-4 sm:grid-cols-2">
          {anterior && (
            <Link href={`/noticias/${anterior.slug}/`} className="tarjeta p-5 hover:border-acento">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tinta-suave">Anterior</span>
              <span className="mt-1 block font-semibold leading-snug">{anterior.titulo}</span>
            </Link>
          )}
          {siguiente && (
            <Link href={`/noticias/${siguiente.slug}/`} className="tarjeta p-5 text-right hover:border-acento sm:col-start-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tinta-suave">Siguiente</span>
              <span className="mt-1 flex items-center justify-end gap-1 font-semibold leading-snug">{siguiente.titulo} <IconoFlecha className="h-4 w-4 shrink-0 text-acento" /></span>
            </Link>
          )}
        </nav>
      </article>
      <BarraNoticias actual={p.slug} />
      </div>
      <CtaFinal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }} />
    </>
  );
}
