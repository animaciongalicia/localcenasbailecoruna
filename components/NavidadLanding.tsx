import Link from "next/link";
import { CtaFinal, Faq, Hero, LineaNoche, ListaMenu, Migas, Ocasiones, Seccion, Titulo } from "./Bloques";
import FormularioNavidad from "./FormularioNavidad";
import { IconoMail, IconoTelefono, IconoWhatsapp } from "./Iconos";
import { JsonLdFaq, JsonLdMigas, ORG_ID } from "./JsonLd";
import { FOTOS } from "@/lib/fotos";
import { getADemanda, getConfirmadas, getNoches } from "@/lib/navidad";
import type { Pregunta } from "@/lib/faq";
import { CONTACTO, MENU, OFERTAS, SEDE, SITE_URL } from "@/lib/sitio";
import { COPY_NAVIDAD, type Variante } from "@/lib/variantes";
import { whatsappUrl } from "@/lib/whatsapp";

export const RUTA_NAVIDAD = "/cenas-navidad-coruna/";
const N = OFERTAS.navidad;
const resto = N.precio - N.senal;
const WA_NAVIDAD = `Hola, quiero consultar una cena de Navidad ${N.anio} en el ${SEDE.nombre}.\nNoche que nos interesa: \nPersonas: `;
const MAIL_NAVIDAD = `mailto:${CONTACTO.email}?subject=${encodeURIComponent(`Cena de Navidad ${N.anio}`)}&body=${encodeURIComponent("Hola, queremos consultar una cena de Navidad.\nNoche: \nPersonas: \nNombre y teléfono: \n")}`;

/** Bajo las fechas: los dos canales de consulta, sin botones por noche. */
function ContactoNavidad() {
  return (
    <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="font-semibold">¿Te encaja alguna noche? Escribe con la fecha y cuántos sois.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={whatsappUrl(WA_NAVIDAD)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="navidad-fechas" data-campana={N.id}><IconoWhatsapp /> WhatsApp</a>
        <a href={MAIL_NAVIDAD} className="btn-linea" data-ubicacion="navidad-fechas"><IconoMail /> Email</a>
      </div>
    </div>
  );
}

export const FAQ_NAVIDAD: Pregunta[] = [
  { p: `¿Cuánto cuesta la cena de Navidad ${N.anio}?`, r: `${N.precio} € por persona: cena completa con bebida durante la cena, show cómico y DJ hasta las 3.` },
  { p: "¿Hay un mínimo de personas?", r: "No. Cada grupo tiene su mesa, sea pequeño o grande, y comparte la noche con otros grupos." },
  { p: "¿Cómo funciona la señal?", r: `${N.senal} € por persona para confirmar la mesa, por transferencia o en persona. Sin señal no hay mesa reservada. La señal no se devuelve.` },
  { p: "¿Y el resto?", r: `El día del evento: ${resto} € por persona, a poder ser en efectivo.` },
  { p: "¿Y si alguien no puede venir?", r: `Si avisas con ${N.horasCancelacion} horas o más, esa persona no paga el resto. Con menos de ${N.horasCancelacion} horas, se paga la cena completa.` },
  { p: "¿Las copas están incluidas?", r: `En la cena, la bebida sí. ${MENU.copas}` },
  { p: "¿Horarios?", r: "Llegada entre las 22:00 y las 22:30, cena con DJ, show cómico de 00:00 a 01:00 y baile hasta las 3 (se cierra entre las 2:30 y las 3:00)." },
  { p: "¿Comidas de empresa o fechas que no están en la lista?", r: "Elige «Otra fecha» en el formulario o escribe por WhatsApp con el día y el número de personas. Se estudia una propuesta a medida." },
  { p: "¿Hay menú vegetariano, vegano o para alergias?", r: MENU.dietas },
];

function JsonLdEventos() {
  const eventos = getConfirmadas().map((f) => {
    const [y, m, d] = f.fecha.split("-").map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Cena baile de Navidad · ${f.etiqueta}`,
      description: `Cena con bebida durante la cena, show cómico y baile con DJ hasta las 3:00 en el ${SEDE.nombre} (A Coruña). Las copas del baile no están incluidas.`,
      startDate: `${f.fecha}T22:00:00+01:00`,
      endDate: `${fin}T03:00:00+01:00`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: SEDE.nombre, address: { "@type": "PostalAddress", streetAddress: SEDE.direccion, addressLocality: SEDE.ciudad, addressCountry: "ES" } },
      image: [`${SITE_URL}${FOTOS.salon.src}`],
      organizer: { "@id": ORG_ID },
      offers: {
        "@type": "Offer",
        price: N.precio,
        priceCurrency: N.moneda,
        availability: f.completa ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        url: `${SITE_URL}${RUTA_NAVIDAD}`,
      },
    };
  });
  if (!eventos.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventos).replace(/</g, "\\u003c") }} />;
}

export default function NavidadLanding({ variante }: { variante: Variante }) {
  const copy = COPY_NAVIDAD[variante];
  const confirmadas = getConfirmadas();
  const aDemanda = getADemanda();
  const pasos = [
    "Eliges noche (o propones otra)",
    "Escribes por WhatsApp o email",
    "Recibes la confirmación por escrito",
    `Pagáis ${N.senal} €/persona de señal. El resto, el día`,
  ];

  return (
    <>
      <Migas actual="Navidad" />
      <Hero
        antetitulo={copy.antetitulo}
        titulo={copy.titular}
        texto={copy.bajada}
        foto={FOTOS.salon}
        precio={false}
        ctaPrincipal={{ href: "#reserva-navidad", texto: "Reservar mesa" }}
        ctaSecundario={{ href: "#fechas", texto: `Ver fechas de ${N.temporada}` }}
      >
        <div className="mt-6 flex items-center gap-4 border-l-2 border-oro pl-4 text-marfil">
          <span className="font-serif text-4xl font-semibold text-oro">{N.precio} €</span>
          <span className="text-sm leading-snug text-marfil/80">por persona · Navidad {N.anio}<br />Cena con bebida · show cómico · DJ hasta las 3</span>
        </div>
      </Hero>

      <Seccion id="fechas" arena>
        <Titulo ante={`Navidad ${N.anio} · ${SEDE.nombre}`} titulo="Noches de Navidad" texto="Cada grupo con su mesa y la noche compartida con otros grupos. Elige noche y te confirmo si hay hueco." />
        {confirmadas.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {confirmadas.map((f) => {
              const [dia, ...resto] = f.etiqueta.split(" ");
              return (
                <li key={f.fecha} className="tarjeta flex flex-col p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta-suave">
                    {dia}
                    {f.nota && <span className="ml-1.5 rounded-full bg-acento/10 px-2 py-0.5 normal-case tracking-normal text-acento">{f.nota}</span>}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold leading-tight sm:text-2xl">{resto.join(" ")}</h3>
                  <p className={`mt-2 text-xs font-semibold ${f.completa ? "text-tinta-suave" : "text-acento"}`}>{f.completa ? "Completa · lista de espera" : "Noche confirmada"}</p>
                </li>
              );
            })}
            <li className="flex flex-col rounded-2xl border-2 border-dashed border-tinta/20 p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta-suave">¿Otro día?</p>
              <h3 className="mt-1 font-serif text-xl font-semibold leading-tight sm:text-2xl">Otras fechas o comidas</h3>
              <p className="mt-2 text-xs text-tinta-suave">Empresas y grupos que necesitan otro día. Pregunta sin compromiso.</p>
            </li>
          </ul>
        ) : (
          <p className="tarjeta mt-8 p-6 text-tinta-suave">Ahora mismo no hay noches publicadas. Escribe con tu fecha y te digo qué hay.</p>
        )}
        <ContactoNavidad />
        {aDemanda.length > 0 && (
          <div className="mt-10">
            <h3 className="font-serif text-2xl font-semibold">Se abren si se juntan grupos</h3>
            <p className="mt-1 max-w-prosa text-tinta-suave">Te apuntas sin compromiso. Si la noche sale, eres de los primeros en saberlo.</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {aDemanda.map((f) => (
                <li key={f.fecha} className="flex flex-col rounded-2xl border border-linea bg-marfil p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta-suave">{f.etiqueta.split(" ")[0]}</p>
                  <h4 className="mt-1 font-serif text-xl font-semibold leading-tight sm:text-2xl">{f.etiqueta.replace(/^\S+\s+/, "")}</h4>
                  <p className="mt-2 text-xs font-semibold text-tinta-suave">{f.completa ? "Completa" : "A demanda"}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Seccion>

      <Seccion>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Titulo ante={`Menú · ${N.precio} €`} titulo="Se cena bien. Luego ya se verá." texto="Cocina gallega para grupos y la bebida de la cena incluida." />
            <p className="mt-6 rounded-2xl border-2 border-acento/40 bg-acento/5 px-5 py-4 font-semibold">Las copas del baile van aparte. Cada uno con la suya.</p>
          </div>
          <div className="tarjeta p-6 sm:p-8"><ListaMenu /></div>
        </div>
      </Seccion>

      <LineaNoche />

      <Seccion>
        <Titulo ante="Cómo reservar" titulo="Cuatro pasos. Cero letra pequeña." />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <li key={p} className="flex items-start gap-4 lg:flex-col lg:gap-2">
              <span className="font-serif text-5xl font-semibold leading-none text-acento">{i + 1}</span>
              <span className="pt-1 text-lg">{p}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-prosa text-tinta-suave">
          Señal de {N.senal} €/persona, que no se devuelve. El resto ({resto} €/persona), el día del evento, a poder ser en efectivo. Si alguien no puede venir y avisas con {N.horasCancelacion} h o más, no paga el resto; con menos, paga la cena.
        </p>
      </Seccion>

      <Seccion id="reserva-navidad" oscura>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Titulo ante="Reserva tu mesa" titulo="Un minuto aquí y tienes el WhatsApp escrito" texto="Elige noche, di cuántos sois y se prepara el mensaje. Lo envías tú y te respondo con la confirmación." />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={whatsappUrl(WA_NAVIDAD)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="navidad" data-campana={N.id}><IconoWhatsapp /> WhatsApp directo</a>
              <a href={MAIL_NAVIDAD} className="btn-linea"><IconoMail /> {CONTACTO.email}</a>
              <a href={CONTACTO.telefonoHref} className="btn-linea" data-ubicacion="navidad"><IconoTelefono /> {CONTACTO.telefono}</a>
            </div>
            <p className="mt-6 text-marfil/75">
              ¿Comida o cena de empresa con otro formato? <Link href="/cenas-empresa-coruna/" className="enlace">Mira las opciones para empresas</Link>.
            </p>
          </div>
          <FormularioNavidad noches={getNoches()} campana={N.id} variante={variante} />
        </div>
      </Seccion>

      <Faq preguntas={FAQ_NAVIDAD} titulo="Navidad: lo que todo el mundo pregunta" />
      <Ocasiones excluir={RUTA_NAVIDAD} />
      <CtaFinal titulo="¿Ya tienes fecha para la cena de Navidad?" texto="Dime el día y cuántos sois. Te respondo con disponibilidad." />
      <JsonLdMigas nombre="Navidad" ruta={RUTA_NAVIDAD} />
      <JsonLdFaq preguntas={FAQ_NAVIDAD} />
      <JsonLdEventos />
    </>
  );
}
