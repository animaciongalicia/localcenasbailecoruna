import Link from "next/link";
import { Seccion, Titulo } from "./Bloques";
import { IconoFlecha } from "./Iconos";
import { postsPorSlug } from "@/lib/noticias";

/* Bloques de contenido editorial: texto que responde dudas reales y posiciona. */

/** Texto largo con titular. Los párrafos admiten **negrita** mínima vía <strong> en el JSX del llamador. */
export function Prosa({ id, ante, titulo, children, arena, aside }: { id?: string; ante?: string; titulo: string; children: React.ReactNode; arena?: boolean; aside?: React.ReactNode }) {
  return (
    <Seccion id={id} arena={arena}>
      <div className={aside ? "grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start" : ""}>
        <div className="max-w-prosa">
          <Titulo ante={ante} titulo={titulo} />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-tinta-suave [&_strong]:text-tinta">{children}</div>
        </div>
        {aside}
      </div>
    </Seccion>
  );
}

/** Guía numerada: "cómo organizarlo paso a paso". */
export function Pasos({ id, ante, titulo, texto, pasos, oscura }: { id?: string; ante: string; titulo: string; texto?: string; pasos: { t: string; d: string }[]; oscura?: boolean }) {
  return (
    <Seccion id={id} oscura={oscura}>
      <Titulo ante={ante} titulo={titulo} texto={texto} />
      <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {pasos.map((p, i) => (
          <li key={p.t} className="flex gap-4">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-xl font-semibold ${oscura ? "bg-oro text-noche" : "bg-acento text-white"}`}>{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold">{p.t}</h3>
              <p className={`mt-1 leading-relaxed ${oscura ? "text-marfil/75" : "text-tinta-suave"}`}>{p.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

/** Honestidad que vende: lo mejor y lo que conviene saber antes. */
export function MejorPeor({ ante = "Sin letra pequeña", titulo, mejor, peor, tituloMejor = "Lo mejor", tituloPeor = "Lo que debes saber antes" }: { ante?: string; titulo: string; mejor: string[]; peor: string[]; tituloMejor?: string; tituloPeor?: string }) {
  return (
    <Seccion arena>
      <Titulo ante={ante} titulo={titulo} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="tarjeta p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-acento">{tituloMejor}</h3>
          <ul className="lista-check mt-4 space-y-3">{mejor.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
        <div className="tarjeta p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold">{tituloPeor}</h3>
          <ul className="mt-4 space-y-3">
            {peor.map((m) => (
              <li key={m} className="relative pl-7 before:absolute before:left-0 before:top-[0.6em] before:h-0.5 before:w-3 before:bg-tinta/50">{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}

/** Casos tipo: "así lo celebran otros grupos" (ejemplos de formato, no testimonios). */
export function Casos({ ante, titulo, texto, casos }: { ante: string; titulo: string; texto?: string; casos: { t: string; d: string; etiqueta?: string }[] }) {
  return (
    <Seccion>
      <Titulo ante={ante} titulo={titulo} texto={texto} />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((c) => (
          <li key={c.t} className="tarjeta flex flex-col p-6">
            {c.etiqueta && <span className="antetitulo">{c.etiqueta}</span>}
            <h3 className="mt-2 font-serif text-2xl font-semibold">{c.t}</h3>
            <p className="mt-2 leading-relaxed text-tinta-suave">{c.d}</p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

/** Enlaces a artículos de Noticias relacionados con la página. */
export function PostsRelacionados({ slugs, titulo = "Para leer antes de organizarlo" }: { slugs: string[]; titulo?: string }) {
  const posts = postsPorSlug(slugs);
  if (!posts.length) return null;
  return (
    <Seccion arena>
      <Titulo ante="Noticias y consejos" titulo={titulo} />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/noticias/${p.slug}/`} className="tarjeta group flex h-full flex-col p-6 hover:border-acento">
              <span className="antetitulo">{p.categoria}</span>
              <span className="mt-2 font-serif text-xl font-semibold group-hover:text-acento">{p.titulo}</span>
              <span className="mt-2 flex-1 text-tinta-suave">{p.descripcion}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-acento">Leer <IconoFlecha className="h-4 w-4" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
