"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/paginas";
import { MARCA } from "@/lib/sitio";
import { IconoAbajo, IconoCerrar, IconoMenu } from "./Iconos";

/** Cabecera fija. Todos los enlaces están en el HTML (rastreables) aunque el desplegable esté cerrado. */
export default function Cabecera() {
  const [movil, setMovil] = useState(false);
  const [desplegable, setDesplegable] = useState(false);
  const ruta = usePathname();
  const ref = useRef<HTMLLIElement>(null);

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
  }, [movil]);

  const activo = (href: string) => (href !== "/" && !href.startsWith("/#") && ruta?.startsWith(href) ? "page" : undefined);

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-marfil/95 backdrop-blur">
      <div className="contenedor flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2 font-serif text-2xl font-semibold text-tinta" aria-label={`${MARCA.nombre}, inicio`}>
          <span>Los<span className="text-acento">7</span>pc</span>
          <span className="hidden font-sans text-xs font-medium uppercase tracking-[0.18em] text-tinta-suave sm:inline">Cenas baile · A Coruña</span>
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
                    className="flex min-h-[44px] items-center gap-1 rounded-full px-3 font-medium text-tinta hover:bg-arena"
                  >
                    {item.texto}
                    <IconoAbajo className={`h-4 w-4 transition-transform ${desplegable ? "rotate-180" : ""}`} />
                  </button>
                  <ul
                    id="menu-celebraciones"
                    className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-linea bg-white p-2 shadow-xl ${desplegable ? "block" : "hidden"}`}
                  >
                    {item.hijos.map((h) => (
                      <li key={h.href}>
                        <Link href={h.href} aria-current={activo(h.href)} className="block rounded-xl px-3 py-2.5 hover:bg-arena">
                          <span className="block font-semibold text-tinta">{h.texto}</span>
                          <span className="block text-sm text-tinta-suave">{h.descripcion}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={activo(item.href)} className="flex min-h-[44px] items-center rounded-full px-3 font-medium text-tinta hover:bg-arena aria-[current=page]:text-acento">
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

      {/* Menú móvil: corto, con los destinos al alcance del pulgar */}
      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-marfil lg:hidden ${movil ? "block" : "hidden"}`}
      >
        <div className="contenedor flex min-h-full flex-col justify-end gap-6 pb-[calc(var(--barra-movil)+1.5rem)] pt-6">
          <ul className="space-y-1">
            <li>
              <Link href="/#experiencia" className="block py-3 font-serif text-2xl font-semibold">La experiencia</Link>
            </li>
            <li className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-tinta-suave">Celebraciones</li>
            {NAV[1].hijos!.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="block py-2.5 pl-3 text-lg font-medium" aria-current={activo(h.href)}>
                  {h.texto}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/menus-precios/" className="block py-3 font-serif text-2xl font-semibold">Menú y precios</Link>
            </li>
            <li>
              <Link href="/club-nautico-oza/" className="block py-3 font-serif text-2xl font-semibold">El espacio</Link>
            </li>
            <li>
              <Link href="/noticias/" className="block py-3 font-serif text-2xl font-semibold">Noticias</Link>
            </li>
          </ul>
          <Link href="/reservas/" className="btn-principal w-full">Consultar disponibilidad</Link>
        </div>
      </nav>
    </header>
  );
}
