import Link from "next/link";
import { CELEBRACIONES_NAV, LEGALES } from "@/lib/paginas";
import { CONTACTO, LEGAL, MARCA, OFERTAS, GRUPO, SEDE } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import BotonConfigCookies from "./BotonConfigCookies";

export default function Pie() {
  return (
    <footer className="oscuro bg-noche text-marfil/80">
      <div className="contenedor grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-semibold text-marfil">
            Los<span className="text-oro">7</span>pc
          </p>
          <p className="mt-3 text-sm leading-relaxed">{MARCA.trayectoria}. Cenas con show cómico y baile en el {SEDE.nombre}.</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li><a className="enlace" href={whatsappUrl()} data-ubicacion="pie" target="_blank" rel="noopener">WhatsApp {CONTACTO.telefono}</a></li>
            <li><a className="hover:text-marfil" href={CONTACTO.telefonoHref} data-ubicacion="pie">Llamar al {CONTACTO.telefono}</a></li>
            <li><a className="hover:text-marfil" href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></li>
          </ul>
        </div>
        <nav aria-label="Celebraciones">
          <p className="font-semibold text-marfil">Celebraciones</p>
          <ul className="mt-3 space-y-1 text-sm">
            {CELEBRACIONES_NAV.map((c) => (
              <li key={c.href}><Link className="inline-block py-1 hover:text-marfil" href={c.href}>{c.texto}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Información">
          <p className="font-semibold text-marfil">La noche</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li><Link className="inline-block py-1 hover:text-marfil" href="/#experiencia">La experiencia</Link></li>
            <li><Link className="inline-block py-1 hover:text-marfil" href="/menus-precios/">Menú y precios</Link></li>
            <li><Link className="inline-block py-1 hover:text-marfil" href="/club-nautico-oza/">El espacio: {SEDE.nombre}</Link></li>
            <li><Link className="inline-block py-1 hover:text-marfil" href="/reservas/">Consultar disponibilidad</Link></li>
            <li><Link className="inline-block py-1 hover:text-marfil" href="/cenas-navidad-coruna/">Cenas de empresa de Navidad</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-marfil">{GRUPO.nombre}</p>
          <p className="mt-3 text-sm leading-relaxed">Los7pc forma parte de {GRUPO.nombre}: marcas para celebrar, viajar y moverse por Galicia.</p>
          <Link className="enlace mt-3 inline-block text-sm" href="/grupo-animacion-galicia/">Conocer el grupo</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="contenedor flex flex-col gap-3 py-6 text-xs text-marfil/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {LEGAL.titular} · CIF {LEGAL.nif} · {LEGAL.domicilio}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {LEGALES.map((l) => (
              <li key={l.href}><Link className="inline-block py-2 hover:text-marfil" href={l.href}>{l.texto}</Link></li>
            ))}
            <li><BotonConfigCookies /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
