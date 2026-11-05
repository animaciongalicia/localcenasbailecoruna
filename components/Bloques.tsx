import Image from "next/image";
import Link from "next/link";
import { FOTOS, type Foto } from "@/lib/fotos";
import { OCASIONES } from "@/lib/paginas";
import type { Pregunta } from "@/lib/faq";
import { CONTACTO, HISTORIA, MARCA, MENU, NOCHE, OFERTAS, SEDE } from "@/lib/sitio";
import { whatsappUrl, type Celebracion, type Modalidad } from "@/lib/whatsapp";
import FormularioConsulta from "./FormularioConsulta";
import { IconoBaile, IconoCena, IconoFlecha, IconoMas, IconoShow, IconoTelefono, IconoUbicacion, IconoWhatsapp } from "./Iconos";

const T = OFERTAS.temporada;

/* ── Cabecera de página ─────────────────────────────────────────────── */
export function Hero({
  antetitulo,
  titulo,
  texto,
  foto = FOTOS.baile,
  precio = true,
  ctaSecundario = { href: "/menus-precios/", texto: "Ver menú y precio" },
  ctaPrincipal = { href: "/reservas/", texto: "Consultar disponibilidad" },
  children,
}: {
  antetitulo: string;
  titulo: string;
  texto: string;
  foto?: Foto;
  precio?: boolean;
  ctaSecundario?: { href: string; texto: string } | null;
  ctaPrincipal?: { href: string; texto: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="oscuro relative overflow-hidden bg-noche">
      <div className="contenedor grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20">
        <div>
          <p className="antetitulo">{antetitulo}</p>
          <h1 className="mt-4 font-serif text-[2.35rem] font-semibold leading-[1.05] text-marfil sm:text-6xl">{titulo}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-marfil/85">{texto}</p>
          {precio && (
            <div className="mt-6 flex items-center gap-4 border-l-2 border-oro pl-4 text-marfil">
              <span className="font-serif text-4xl font-semibold text-oro">{T.precio} €</span>
              <span className="text-sm leading-snug text-marfil/80">
                por persona, IVA incluido<br />
                Cena baile conjunta · {T.temporadaCorta.toLowerCase()} {T.anio}
              </span>
            </div>
          )}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={ctaPrincipal.href} className="btn-principal">{ctaPrincipal.texto}</Link>
            {ctaSecundario && <Link href={ctaSecundario.href} className="btn-linea">{ctaSecundario.texto}</Link>}
          </div>
          {children}
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-oro/30">
          <Image src={foto.src} alt={foto.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function Seccion({ id, oscura, arena, children, className = "" }: { id?: string; oscura?: boolean; arena?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`seccion ${oscura ? "oscuro bg-noche text-marfil" : arena ? "bg-arena" : ""} ${className}`}>
      <div className="contenedor">{children}</div>
    </section>
  );
}

export function Titulo({ ante, titulo, texto, as: H = "h2" }: { ante?: string; titulo: string; texto?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <div>
      {ante && <p className="antetitulo">{ante}</p>}
      <H className="titulo-seccion mt-3">{titulo}</H>
      {texto && <p className="entradilla">{texto}</p>}
    </div>
  );
}

/* ── Qué incluye ────────────────────────────────────────────────────── */
export function Incluye({ id = "experiencia", titulo = "Una noche completa, sin que tengas que organizar nada" }: { id?: string; titulo?: string }) {
  const items = [
    { Icono: IconoCena, t: "Cena sentada", d: "Menú completo con bebida durante la cena: vino, sangría, refrescos y cerveza." },
    { Icono: IconoShow, t: "Show cómico", d: "Una hora de humor con el público, de medianoche a la una." },
    { Icono: IconoBaile, t: "DJ y baile hasta las 3", d: "Música para distintas generaciones. Copas aparte, en la barra." },
  ];
  return (
    <Seccion id={id}>
      <Titulo ante="La experiencia" titulo={titulo} texto="Cena, espectáculo y baile en el mismo sitio. Llegas, te sientas y la noche ya está montada." />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map(({ Icono, t, d }) => (
          <li key={t} className="tarjeta p-6">
            <Icono className="h-10 w-10 text-acento" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">{t}</h3>
            <p className="mt-2 leading-relaxed text-tinta-suave">{d}</p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

/* ── Dos maneras de celebrar ─────────────────────────────────────────── */
export function DosModalidades({ ejemploConjunta, ejemploMedida }: { ejemploConjunta?: string; ejemploMedida?: string }) {
  return (
    <Seccion arena>
      <Titulo ante="Elige tu formato" titulo="Dos maneras de celebrar" />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="tarjeta flex flex-col p-6 sm:p-8">
          <p className="antetitulo">Temporada {T.temporadaCorta.toLowerCase()}</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold">Cena baile conjunta</h3>
          <p className="mt-3 leading-relaxed text-tinta-suave">
            {ejemploConjunta ?? "Vienes con tu grupo, sea de 6 o de 30. Tenéis vuestra mesa y compartís la noche con otros grupos: más ambiente, más baile."}
          </p>
          <p className="mt-5 font-serif text-4xl font-semibold text-acento">
            {T.precio} € <span className="font-sans text-base font-medium text-tinta-suave">por persona · IVA incluido</span>
          </p>
          <ul className="lista-check mt-5 space-y-2">
            {T.incluye.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <div className="mt-auto pt-7">
            <Link href="/reservas/?modalidad=conjunta" className="btn-principal w-full sm:w-auto">Consultar disponibilidad</Link>
          </div>
        </article>
        <article className="tarjeta flex flex-col p-6 sm:p-8">
          <p className="antetitulo">Según fecha y grupo</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold">Celebración a medida</h3>
          <p className="mt-3 leading-relaxed text-tinta-suave">
            {ejemploMedida ?? "Para quien quiere un formato propio: menú sentado o catering de pie, con o sin DJ, con o sin show."}
          </p>
          <p className="mt-5 font-serif text-3xl font-semibold">Presupuesto personalizado</p>
          <ul className="lista-check mt-5 space-y-2">
            <li>Menú sentado o catering de pie</li>
            <li>DJ y show cómico, si los queréis</li>
            <li>Precio según fecha, asistentes y servicios</li>
          </ul>
          <div className="mt-auto pt-7">
            <Link href="/reservas/?modalidad=medida" className="btn-linea w-full sm:w-auto">Pedir propuesta para mi celebración</Link>
          </div>
        </article>
      </div>
    </Seccion>
  );
}

/* ── ¿Qué celebráis? ────────────────────────────────────────────────── */
export function Ocasiones({ excluir }: { excluir?: string }) {
  const lista = OCASIONES.filter((o) => o.href !== excluir);
  return (
    <Seccion>
      <Titulo ante="Para cada motivo" titulo="¿Qué celebráis?" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((o) => (
          <li key={o.href}>
            <Link href={o.href} className="tarjeta group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:border-acento">
              <span>
                <span className="block font-serif text-2xl font-semibold group-hover:text-acento">{o.titulo}</span>
                <span className="mt-1 block text-tinta-suave">{o.texto}</span>
              </span>
              <IconoFlecha className="mt-1 h-6 w-6 shrink-0 text-acento" />
            </Link>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

/* ── Así transcurre la noche ────────────────────────────────────────── */
export function LineaNoche() {
  return (
    <Seccion oscura>
      <Titulo ante="De las 22:00 a las 3:00" titulo="Así transcurre la noche" texto="Horario orientativo: el baile cierra entre las 2:30 y las 3:00, según el ambiente de los grupos." />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NOCHE.map((n) => (
          <li key={n.hora} className="rounded-2xl border border-white/15 bg-noche-800 p-6">
            <p className="font-serif text-2xl font-semibold text-oro">
              {n.hora}<span className="text-marfil/50"> – {n.fin}</span>
            </p>
            <h3 className="mt-3 text-lg font-semibold text-marfil">{n.titulo}</h3>
            <p className="mt-1 leading-relaxed text-marfil/75">{n.texto}</p>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

/* ── Menú resumido ──────────────────────────────────────────────────── */
export function MenuResumen({ enlace = true }: { enlace?: boolean }) {
  return (
    <Seccion>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Titulo
          ante={`Menú ${T.anio}`}
          titulo="Lo que se cena"
          texto="Cocina gallega de siempre, pensada para grupos. Y la bebida de la cena, incluida."
        />
        <div className="tarjeta p-6 sm:p-8">
          <ListaMenu />
          {enlace && (
            <Link href="/menus-precios/" className="enlace mt-6 inline-block">Ver menú, precio y condiciones</Link>
          )}
        </div>
      </div>
    </Seccion>
  );
}

export function ListaMenu() {
  const grupos: [string, readonly string[]][] = [
    ["Entrantes", MENU.entrantes],
    ["Principal", MENU.principal],
    ["Postre", MENU.postre],
    ["Bebida durante la cena", MENU.bebida],
  ];
  return (
    <div className="space-y-5">
      {grupos.map(([g, items]) => (
        <div key={g}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-acento">{g}</h3>
          <p className="mt-1 text-lg">{items.join(" · ")}</p>
        </div>
      ))}
      <p className="border-t border-linea pt-4 text-sm leading-relaxed text-tinta-suave">{MENU.dietas} {MENU.copas}</p>
    </div>
  );
}

/* ── Fechas ─────────────────────────────────────────────────────────── */
export function Fechas() {
  return (
    <Seccion arena>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Titulo
          ante={`Temporada ${T.temporada}`}
          titulo="Consulta tu fecha"
          texto="No hay un calendario cerrado: las noches se abren según las reservas de los grupos. Dime qué fecha te interesa, cuántos sois, y te confirmo si hay hueco o qué noches tienes cerca."
        />
        <div className="tarjeta p-6">
          <p className="font-semibold">Lo más rápido: escribe por WhatsApp</p>
          <p className="mt-1 text-sm text-tinta-suave">Fecha, número de personas y qué celebráis. Con eso basta para empezar.</p>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/reservas/" className="btn-principal">Consultar disponibilidad</Link>
            <a href={whatsappUrl()} className="btn-wa" data-ubicacion="fechas" target="_blank" rel="noopener"><IconoWhatsapp /> Escribir por WhatsApp</a>
          </div>
        </div>
      </div>
    </Seccion>
  );
}

/* ── Espacio ────────────────────────────────────────────────────────── */
export function Espacio({ enlace = true }: { enlace?: boolean }) {
  return (
    <Seccion>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-3xl">
          <Image src={FOTOS.salon.src} alt={FOTOS.salon.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div>
          <Titulo ante="Dónde" titulo={`En el ${SEDE.nombre}`} texto={`Las cenas baile se celebran en el ${SEDE.nombre}, en la playa de Oza (A Coruña). ${SEDE.aparcamiento}`} />
          <p className="mt-4 flex items-start gap-2 text-tinta-suave">
            <IconoUbicacion className="mt-0.5 h-5 w-5 shrink-0 text-acento" /> {SEDE.direccion}, {SEDE.ciudad}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {enlace && <Link href="/club-nautico-oza/" className="btn-linea">Ver el espacio</Link>}
            <a href={SEDE.mapsUrl} className="btn-linea" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </div>
    </Seccion>
  );
}

/* ── Confianza: trayectoria ─────────────────────────────────────────── */
export function Trayectoria() {
  return (
    <Seccion oscura>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Titulo ante="Quién organiza" titulo={MARCA.trayectoria} />
          <p className="entradilla">
            La noche la organiza la misma gente desde hace más de quince años: primero en hoteles y salas de A Coruña, y ahora en el {SEDE.nombre}. Cuando reservas aquí, hablas directamente con quien la prepara. Sin intermediarios.
          </p>
        </div>
        <ol className="space-y-3">
          {HISTORIA.map((h) => (
            <li key={h.lugar} className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${"actual" in h ? "border-oro bg-noche-700" : "border-white/15"}`}>
              <span className="font-serif text-xl font-semibold text-marfil">{h.lugar}</span>
              <span className={`text-right text-sm ${"actual" in h ? "font-semibold text-oro" : "text-marfil/70"}`}>{h.detalle}</span>
            </li>
          ))}
        </ol>
      </div>
    </Seccion>
  );
}

/* ── Galería (solo fotos reales) ────────────────────────────────────── */
export function Galeria({ fotos }: { fotos: Foto[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {fotos.map((f) => (
        <li key={f.src} className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-arena">
          <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 560px, 50vw" className="object-cover" loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

/* ── Preguntas frecuentes ───────────────────────────────────────────── */
export function Faq({ preguntas, titulo = "Dudas antes de reservar" }: { preguntas: Pregunta[]; titulo?: string }) {
  return (
    <Seccion id="dudas">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Titulo ante="Preguntas frecuentes" titulo={titulo} />
        <div className="divide-y divide-linea border-y border-linea">
          {preguntas.map((q) => (
            <details key={q.p} className="group">
              <summary className="flex min-h-[56px] items-center justify-between gap-4 py-4 text-lg font-semibold">
                {q.p}
                <IconoMas className="faq-icono h-5 w-5 shrink-0 text-acento transition-transform" />
              </summary>
              <p className="pb-5 leading-relaxed text-tinta-suave">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </Seccion>
  );
}

/* ── Llamada final ──────────────────────────────────────────────────── */
export function CtaFinal({ titulo = "¿Tienes fecha en mente?", texto = "Cuéntame qué celebráis, cuántos sois y qué día. Te respondo con disponibilidad y opciones." }: { titulo?: string; texto?: string }) {
  return (
    <Seccion oscura>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="titulo-seccion">{titulo}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-marfil/80">{texto}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/reservas/" className="btn-principal">Consultar disponibilidad</Link>
          <a href={whatsappUrl()} className="btn-wa" data-ubicacion="cta-final" target="_blank" rel="noopener"><IconoWhatsapp /> WhatsApp</a>
          <a href={CONTACTO.telefonoHref} className="btn-linea" data-ubicacion="cta-final"><IconoTelefono /> {CONTACTO.telefono}</a>
        </div>
      </div>
    </Seccion>
  );
}

/* ── Migas de pan ───────────────────────────────────────────────────── */
export function Migas({ actual }: { actual: string }) {
  return (
    <nav aria-label="Migas de pan" className="border-b border-linea bg-marfil">
      <ol className="contenedor flex flex-wrap items-center gap-2 py-3 text-sm text-tinta-suave">
        <li><Link href="/" className="hover:text-acento">Inicio</Link></li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="font-medium text-tinta">{actual}</li>
      </ol>
    </nav>
  );
}

/* ── Texto con lista a dos columnas (páginas de ocasión) ─────────────── */
export function Argumentos({ ante, titulo, texto, puntos, oscura }: { ante: string; titulo: string; texto?: string; puntos: { t: string; d: string }[]; oscura?: boolean }) {
  return (
    <Seccion oscura={oscura}>
      <Titulo ante={ante} titulo={titulo} texto={texto} />
      <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {puntos.map((p) => (
          <li key={p.t} className={`border-l-2 pl-5 ${oscura ? "border-oro" : "border-acento"}`}>
            <h3 className="text-lg font-semibold">{p.t}</h3>
            <p className={`mt-1 leading-relaxed ${oscura ? "text-marfil/75" : "text-tinta-suave"}`}>{p.d}</p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

/* ── Formulario de consulta en contexto ─────────────────────────────── */
export function BloqueConsulta({
  titulo = "Consulta disponibilidad",
  texto = "Rellena lo básico y se prepara un mensaje de WhatsApp con tus datos. Lo revisas y lo envías tú.",
  celebracion,
  modalidad,
  campana,
}: {
  titulo?: string;
  texto?: string;
  celebracion?: Celebracion;
  modalidad?: Modalidad;
  campana?: string;
}) {
  return (
    <Seccion id="consulta" arena>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Titulo ante="Sin compromiso" titulo={titulo} texto={texto} />
          <p className="mt-6 text-tinta-suave">
            ¿Prefieres hablar? Llama al <a href={CONTACTO.telefonoHref} className="enlace" data-ubicacion="bloque-consulta">{CONTACTO.telefono}</a>.
          </p>
        </div>
        <FormularioConsulta celebracionInicial={celebracion} modalidadInicial={modalidad} campana={campana} />
      </div>
    </Seccion>
  );
}

/* ── Mosaico de ambiente (fotos reales) ─────────────────────────────── */
export function Ambiente() {
  const [a, b, c, d] = [FOTOS.baile, FOTOS.celebrando, FOTOS.salon, FOTOS.grupos];
  return (
    <section aria-label="Fotos de ambiente" className="bg-marfil pt-14 sm:pt-20">
      <div className="contenedor grid grid-cols-2 gap-3 sm:gap-4 lg:h-[520px] lg:grid-cols-4 lg:grid-rows-2">
        {[a, b, c, d].map((f, i) => (
          <div key={f.src} className={`relative overflow-hidden rounded-2xl bg-arena ${i === 0 ? "col-span-2 lg:row-span-2" : ""} ${i === 3 ? "lg:col-span-2" : ""} aspect-[3/2] lg:aspect-auto`}>
            <Image src={f.src} alt={f.alt} fill sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, 50vw"} className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
