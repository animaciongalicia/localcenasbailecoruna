import Image from "next/image";
import Link from "next/link";
import { getConfirmadas } from "@/lib/navidad";
import { postsOrdenados } from "@/lib/noticias";
import { CELEBRACIONES_NAV } from "@/lib/paginas";
import { OFERTAS } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import { IconoFlecha, IconoWhatsapp } from "./Iconos";

const CONSEJOS = [
  "El mejor discurso de Navidad dura menos que un anuncio de turrones.",
  "Propón dos fechas, no diez. Las encuestas abiertas son el enemigo.",
  "Foto de grupo ANTES del baile. Después ya nadie sale presentable.",
  "La tarta se pacta antes. Aparecer con ella en la puerta es deporte de riesgo.",
  "Organiza la vuelta a casa antes de la primera copa, no después de la quinta.",
  "«Yo no bailo» es la frase con menos credibilidad de toda la noche.",
  "Alergias: se preguntan una vez, por escrito y al principio. Nunca con el plato delante.",
];

/** Barra lateral de Noticias: conversión, Navidad, humor y navegación. */
export default function BarraNoticias({ actual }: { actual?: string }) {
  const consejo = CONSEJOS[(actual ?? "").length % CONSEJOS.length];
  const noches = OFERTAS.navidad.destacada ? getConfirmadas().slice(0, 8) : [];
  const otros = postsOrdenados().filter((p) => p.slug !== actual).slice(0, 4);
  return (
    <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Más información">
      <div className="oscuro rounded-3xl bg-noche p-6 text-marfil">
        <p className="antetitulo">¿Te toca organizar?</p>
        <p className="mt-2 font-serif text-2xl font-semibold leading-tight">Cena, show y baile hasta las 3. Tú solo pones la fecha.</p>
        <div className="mt-5 flex flex-col gap-2">
          <Link href="/reservas/" className="btn-principal">Consultar disponibilidad</Link>
          <a href={whatsappUrl()} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="blog-lateral"><IconoWhatsapp /> WhatsApp</a>
        </div>
      </div>

      {noches.length > 0 && (
        <div className="tarjeta p-6">
          <p className="antetitulo">Navidad {OFERTAS.navidad.anio}</p>
          <p className="mt-2 font-serif text-xl font-semibold">Noches abiertas para cenas de empresa</p>
          <ul className="mt-4 grid grid-cols-4 gap-2">
            {noches.map((f) => {
              const [dia, num, , mes] = f.etiqueta.split(" ");
              return (
                <li key={f.fecha} className="rounded-xl bg-arena px-1 py-2 text-center">
                  <span className="block text-[10px] font-semibold uppercase text-tinta-suave">{dia.slice(0, 3)}</span>
                  <span className="block font-serif text-xl font-semibold leading-none text-acento">{num}</span>
                  <span className="block text-[10px] text-tinta-suave">{mes?.slice(0, 3)}</span>
                </li>
              );
            })}
          </ul>
          <Link href="/cenas-navidad-coruna/" className="enlace mt-4 inline-block text-sm">Ver cenas de empresa de Navidad</Link>
        </div>
      )}

      <div className="rounded-3xl border-2 border-dashed border-acento/40 bg-acento/5 p-6">
        <p className="antetitulo">Consejo exprés</p>
        <p className="mt-2 font-serif text-xl font-semibold leading-snug text-tinta">{consejo}</p>
      </div>

      <div className="tarjeta p-6">
        <p className="antetitulo">Celebraciones</p>
        <ul className="mt-3 space-y-1">
          {CELEBRACIONES_NAV.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-arena">
                {c.foto && (
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-arena">
                    <Image src={c.foto.src} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                )}
                <span className="text-sm font-semibold leading-tight">{c.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {otros.length > 0 && (
        <div className="tarjeta p-6">
          <p className="antetitulo">Más noticias</p>
          <ul className="mt-3 space-y-3">
            {otros.map((p) => (
              <li key={p.slug}>
                <Link href={`/noticias/${p.slug}/`} className="group flex items-start justify-between gap-2 text-sm font-semibold leading-snug hover:text-acento">
                  {p.titulo}
                  <IconoFlecha className="mt-0.5 h-4 w-4 shrink-0 text-acento" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
