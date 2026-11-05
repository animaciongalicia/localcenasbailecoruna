import { Faq, Migas, Seccion, Titulo } from "@/components/Bloques";
import FormularioConsulta from "@/components/FormularioConsulta";
import { IconoMail, IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_RESERVAS } from "@/lib/faq";
import { meta } from "@/lib/seo";
import { FOTOS } from "@/lib/fotos";
import { CONTACTO, OFERTAS } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

const RUTA = "/reservas/";

export const metadata = meta({
  titulo: "Consultar disponibilidad y reservar · Cenas baile Los7pc A Coruña",
  descripcion: `Consulta fecha para tu cena baile en A Coruña por WhatsApp o teléfono (${CONTACTO.telefono}). Grupos desde 6 personas, cena conjunta o celebración a medida.`,
  ruta: RUTA,
  imagen: FOTOS.baile.src,
});

const PASOS = [
  { t: "Consultas", d: "Fecha, personas y qué celebráis. Por WhatsApp, teléfono o con el formulario." },
  { t: "Te respondo", d: "Si hay hueco para tu grupo, te paso disponibilidad y las condiciones por escrito." },
  { t: "Confirmas", d: "La reserva queda confirmada con el pago de confirmación. Antes, nada está cerrado." },
];

export default function Reservas() {
  return (
    <>
      <Migas actual="Reservas" />
      <Seccion className="!pt-10">
        <Titulo
          as="h1"
          ante={`Temporada ${OFERTAS.temporada.temporada} · consulta tu fecha`}
          titulo="Consultar disponibilidad"
          texto="Cuéntame lo básico y te preparo la respuesta. Grupos pequeños y grandes, cena conjunta o celebración a medida."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <FormularioConsulta />
          <aside className="space-y-5">
            <div className="tarjeta p-6">
              <h2 className="font-serif text-2xl font-semibold">Contacto directo</h2>
              <ul className="mt-4 space-y-3">
                <li><a href={whatsappUrl()} className="btn-wa w-full" data-ubicacion="reservas" target="_blank" rel="noopener"><IconoWhatsapp /> WhatsApp</a></li>
                <li><a href={CONTACTO.telefonoHref} className="btn-linea w-full" data-ubicacion="reservas"><IconoTelefono /> {CONTACTO.telefono}</a></li>
                <li><a href={`mailto:${CONTACTO.email}`} className="btn-linea w-full"><IconoMail /> {CONTACTO.email}</a></li>
              </ul>
            </div>
            <div className="tarjeta p-6">
              <h2 className="font-serif text-2xl font-semibold">Cómo funciona</h2>
              <ol className="mt-4 space-y-4">
                {PASOS.map((p, i) => (
                  <li key={p.t} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acento font-semibold text-white">{i + 1}</span>
                    <span><strong className="block">{p.t}</strong><span className="text-tinta-suave">{p.d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Seccion>
      <Faq preguntas={FAQ_RESERVAS} />
      <JsonLdMigas nombre="Reservas" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_RESERVAS} />
    </>
  );
}
