import { CONTACTO } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import { IconoTelefono, IconoWhatsapp } from "./Iconos";

/** Accesos fijos en móvil. El body reserva su altura (--barra-movil) para no tapar contenido. */
export default function BarraMovil() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-marfil/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="mx-auto grid h-[var(--barra-movil)] max-w-md grid-cols-[1fr_auto] items-center gap-2">
        <a href={whatsappUrl()} className="btn-wa min-h-[48px] w-full" data-ubicacion="barra-movil" target="_blank" rel="noopener">
          <IconoWhatsapp /> WhatsApp
        </a>
        <a href={CONTACTO.telefonoHref} className="btn-linea min-h-[48px] px-5" data-ubicacion="barra-movil">
          <IconoTelefono /> Llamar
        </a>
      </div>
    </div>
  );
}
