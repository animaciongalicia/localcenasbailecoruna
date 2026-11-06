"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CELEBRACIONES_NAV, NAV } from "@/lib/paginas";
import { MARCA } from "@/lib/sitio";
import { IconoAbajo, IconoCerrar, IconoFlecha, IconoMenu } from "./Iconos";

/** Cabecera fija. Todos los enlaces están en el HTML (rastreables) aunque el desplegable esté cerrado. */
export default function Cabecera() {
  const [movil, setMovil] = useState(false);
  const [desplegable, setDesplegable] = useState(false);
  const ruta = usePathname();
  const ref = useRef<HTMLLIElement>(null);
  const cabecera = useRef<HTMLElement>(null);
  const [topMenu, setTopMenu] = useState(68);

  useEffect(() => {
    setMovil(false);
    setDesplegable(false);
  }, [ruta]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMovil(false);
        setDesplegable(false);
      }
    };
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDesplegable(false);
    };
    document.addEventListener("keydown", esc);
    document.addEventListener("click", fuera);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("click", fuera);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = movil ? "hidden" : "";
    if (movil && cabecera.current) setTopMenu(Math.max(0, cabecera.current.getBoundingClientRect().bottom));
  }, [movil]);

  const activo = (href: string) => (href !== "/" && ruta?.startsWith(href) ? "page" : undefined);
  const enCelebraciones = CELEBRACIONES_NAV.some((h) => ruta?.startsWith(h.href)) || ruta?.startsWith("/celebraciones-coruna/");
  const base = "relative flex min-h-[44px] items-center gap-1.5 px-3 text-[0.95rem] font-semibold text-tinta transition-colors hover:text-acento";
  const subrayado = "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-acento";

  return (
    <header ref={cabecera} className="sticky top-0 z-50 border-b border-linea bg-marfil">
      <div className="contenedor flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 flex-col leading-none" aria-label={`${MARCA.nombre}, inicio`}>
          <span className="font-serif text-[1.7rem] font-semibold text-tinta">
            Los<span className="text-acento">7</span>pc
          </span>
          <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-tinta-suave">Cenas baile · A Coruña</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) =>
              item.hijos ? (
                <li key={item.href} className="relative" ref={ref}>
                  <button
                    type="button"
                    aria-expanded={desplegable}
                    aria-controls="menu-celebraciones"
                    onClick={() => setDesplegable((v) => !v)}
                    className={`${base} ${enCelebraciones ? subrayado : ""}`}
                  >
                    {item.texto}
                    <IconoAbajo className={`h-4 w-4 transition-transform ${desplegable ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    id="menu-celebraciones"
                    className={`absolute left-1/2 top-full mt-3 w-[620px] -translate-x-1/2 rounded-3xl border border-linea bg-white p-3 shadow-2xl ${desplegable ? "block" : "hidden"}`}
                  >
                    <ul className="grid grid-cols-2 gap-1">
                      {item.hijos.map((h) => (
                        <li key={h.href}>
                          <Link href={h.href} aria-current={activo(h.href)} className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-arena aria-[current=page]:bg-arena">
                            {h.foto && (
                              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-arena">
                                <Image src={h.foto.src} alt="" fill sizes="56px" className="object-cover" />
                              </span>
                            )}
                            <span>
                              <span className="block font-semibold leading-tight text-tinta">{h.texto}</span>
                              <span className="mt-0.5 block text-sm leading-snug text-tinta-suave">{h.descripcion}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={item.href} className="mt-2 flex items-center justify-between rounded-2xl bg-noche px-4 py-3 font-semibold text-marfil hover:bg-noche-700">
                      Ver todas las celebraciones
                      <IconoFlecha className="h-5 w-5 text-oro" />
                    </Link>
                  </div>
                </li>
              ) : item.destacado ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={activo(item.href)}
                    className="mr-1 flex min-h-[40px] items-center gap-2 rounded-full bg-acento/10 px-4 text-[0.95rem] font-semibold text-acento ring-1 ring-acento/25 transition-colors hover:bg-acento hover:text-white aria-[current=page]:bg-acento aria-[current=page]:text-white"
                  >
                    <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
                    {item.texto}
                  </Link>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={activo(item.href)} className={`${base} aria-[current=page]:text-acento ${activo(item.href) ? subrayado : ""}`}>
                    {item.texto}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/reservas/" className="btn-principal hidden min-h-[44px] px-5 text-sm sm:inline-flex" data-ubicacion="cabecera">
            Consultar disponibilidad
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-tinta hover:bg-arena lg:hidden"
            aria-expanded={movil}
            aria-controls="menu-movil"
            aria-label={movil ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMovil((v) => !v)}
          >
            {movil ? <IconoCerrar /> : <IconoMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil: corto y con los destinos al alcance del pulgar */}
      <nav id="menu-movil" aria-label="Menú móvil" style={{ top: topMenu }} className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-linea bg-marfil lg:hidden ${movil ? "block" : "hidden"}`}>
        <div className="contenedor flex min-h-full flex-col gap-6 pb-[calc(var(--barra-movil)+1.5rem)] pt-5">
          {NAV.filter((n) => n.destacado).map((n) => (
            <Link key={n.href} href={n.href} className="flex items-center justify-between rounded-2xl bg-acento px-5 py-4 font-serif text-2xl font-semibold text-white">
              Cenas de empresa de {n.texto}
              <IconoFlecha className="h-6 w-6" />
            </Link>
          ))}
          <div>
            <Link href="/celebraciones-coruna/" className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-tinta-suave">
              Celebraciones <span className="normal-case tracking-normal text-acento">Ver todas</span>
            </Link>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {CELEBRACIONES_NAV.filter((h) => !NAV.some((n) => n.destacado && n.href === h.href)).map((h) => (
                <li key={h.href}>
                  <Link href={h.href} aria-current={activo(h.href)} className="flex h-full min-h-[56px] items-center rounded-2xl border border-linea bg-white px-4 py-3 font-semibold leading-tight">
                    {h.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="divide-y divide-linea border-y border-linea">
            {NAV.filter((n) => !n.hijos && !n.destacado).map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={activo(n.href)} className="flex items-center justify-between py-4 font-serif text-2xl font-semibold">
                  {n.texto}
                  <IconoFlecha className="h-5 w-5 text-acento" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/reservas/" className="btn-principal mt-auto w-full">Consultar disponibilidad</Link>
        </div>
      </nav>
    </header>
  );
}
