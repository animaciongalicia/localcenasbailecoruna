import Link from "next/link";
import { postsOrdenados, fechaPost } from "@/lib/noticias";
import { CELEBRACIONES_NAV, LEGALES } from "@/lib/paginas";
import { CONTACTO, LEGAL, MARCA, OFERTAS, SEDE } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import BotonConfigCookies from "./BotonConfigCookies";
import { IconoMail, IconoTelefono, IconoUbicacion, IconoWhatsapp } from "./Iconos";

const enlace = "inline-block py-1 hover:text-marfil";

export default function Pie() {
  const ultimas = postsOrdenados().slice(0, 3);
  return (
    <footer className="oscuro bg-noche text-marfil/75">
      <div className="contenedor grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        {/* 2/5: marca y contacto */}
        <div className="sm:col-span-2">
          <p className="font-serif text-3xl font-semibold text-marfil">
            Los<span className="text-oro">7</span>pc
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            {MARCA.trayectoria}. Cenas con show cómico y baile hasta las 3 en el {SEDE.nombre}, y eventos en exclusiva todo el año.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 font-semibold text-marfil hover:text-oro" href={whatsappUrl()} data-ubicacion="pie" target="_blank" rel="noopener">
                <IconoWhatsapp className="h-5 w-5 text-wa" /> WhatsApp {CONTACTO.telefono}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-marfil" href={CONTACTO.telefonoHref} data-ubicacion="pie">
                <IconoTelefono className="h-5 w-5 text-oro" /> {CONTACTO.telefono}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-marfil" href={`mailto:${CONTACTO.email}`}>
                <IconoMail className="h-5 w-5 text-oro" /> {CONTACTO.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <IconoUbicacion className="h-5 w-5 shrink-0 text-oro" /> {SEDE.nombre}, {SEDE.direccion}, {SEDE.ciudad}
            </li>
          </ul>
        </div>

        <nav aria-label="Celebraciones">
          <p className="font-semibold text-marfil">Celebraciones</p>
          <ul className="mt-3 space-y-1 text-sm">
            {CELEBRACIONES_NAV.map((c) => (
              <li key={c.href}><Link className={enlace} href={c.href}>{c.texto}</Link></li>
            ))}
            <li><Link className={`${enlace} font-semibold text-oro`} href="/celebraciones-coruna/">Todas las celebraciones</Link></li>
          </ul>
        </nav>

        <nav aria-label="Los7pc">
          <p className="font-semibold text-marfil">Los7pc</p>
          <ul className="mt-3 space-y-1 text-sm">
            {OFERTAS.navidad.destacada && <li><Link className={enlace} href="/cenas-navidad-coruna/">Navidad {OFERTAS.navidad.anio}</Link></li>}
            <li><Link className={enlace} href="/menus-precios/">Menús y precios</Link></li>
            <li><Link className={enlace} href="/club-nautico-oza/">El local</Link></li>
            <li><Link className={enlace} href="/noticias/">Noticias</Link></li>
            <li><Link className={enlace} href="/reservas/">Contacto y reservas</Link></li>
          </ul>
        </nav>

        <nav aria-label="Últimas noticias">
          <p className="font-semibold text-marfil">Novedades</p>
          <ul className="mt-3 space-y-4 text-sm">
            {ultimas.map((p) => (
              <li key={p.slug}>
                <Link className="block font-medium leading-snug text-marfil/90 hover:text-oro" href={`/noticias/${p.slug}/`}>{p.titulo}</Link>
                <span className="mt-1 block text-xs text-marfil/50">{fechaPost(p.fecha)}</span>
              </li>
            ))}
            <li><Link className={`${enlace} font-semibold text-oro`} href="/noticias/">Todas las noticias</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="contenedor flex flex-col gap-3 py-6 text-xs text-marfil/55 lg:flex-row lg:items-center lg:justify-between">
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
