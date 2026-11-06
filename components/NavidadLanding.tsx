import Link from "next/link";
import { BandaFotos, Ambiente, CtaFinal, DosModalidades, Faq, Hero, LineaNoche, ListaMenu, Migas, Ocasiones, Seccion, Titulo } from "./Bloques";
import { Casos, MejorPeor, Pasos, PostsRelacionados, Prosa } from "./Contenido";
import { IconoMail, IconoTelefono, IconoWhatsapp } from "./Iconos";
import { JsonLdFaq, JsonLdMigas, ORG_ID } from "./JsonLd";
import { FOTOS } from "@/lib/fotos";
import { getADemanda, getConfirmadas, type Noche } from "@/lib/navidad";
import type { Pregunta } from "@/lib/faq";
import { CONTACTO, EXCLUSIVO, MENU, OFERTAS, SEDE, SITE_URL } from "@/lib/sitio";
import { COPY_NAVIDAD, type Variante } from "@/lib/variantes";
import { mailUrl, whatsappUrl } from "@/lib/whatsapp";

export const RUTA_NAVIDAD = "/cenas-navidad-coruna/";
const N = OFERTAS.navidad;
const WA_NAVIDAD = `Hola, quiero consultar una cena de Navidad ${N.anio} en el ${SEDE.nombre}.\nNoche que nos interesa: \nPersonas: `;
const MAIL_NAVIDAD = mailUrl(`Cena de Navidad ${N.anio}`, "Hola, queremos consultar una cena de Navidad.\nNoche: \nPersonas: \nNombre y teléfono: \n");

/** Agrupa las noches por mes: [["noviembre", [...]], ["diciembre", [...]]]. */
function porMes(noches: Noche[]): [string, Noche[]][] {
  const grupos = new Map<string, Noche[]>();
  for (const f of noches) {
    const mes = f.etiqueta.split(" de ").pop() || "";
    grupos.set(mes, [...(grupos.get(mes) || []), f]);
  }
  return [...grupos.entries()];
}

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
  { p: "¿Dónde hacer la cena de empresa de Navidad en A Coruña?", r: `Si buscáis algo más que cenar, la cena baile del ${SEDE.nombre} junta en un solo sitio la cena, una hora de show cómico y DJ hasta las 3. Nadie tiene que decidir a dónde ir después.` },
  { p: "¿Con cuánta antelación hay que reservar?", r: "Diciembre es el mes con más demanda del año. Lo ideal es consultar en cuanto tengáis una fecha aproximada; con una idea del número de personas basta para empezar." },
  { p: "¿Cuánto cuesta la cena de Navidad?", r: "Precio cerrado por persona, que incluye cena, bebida durante la cena, show y DJ. Lo tienes en la página de Menús, junto con las condiciones de reserva." },
  { p: "¿Cómo se reserva la mesa?", r: "Consultas fecha y número de personas por WhatsApp, email o teléfono. Si hay hueco, recibes la confirmación y las condiciones por escrito, y la mesa queda reservada con una señal por persona." },
  { p: "Somos solo 8 de la oficina. ¿Merece la pena?", r: "Sí: es justo el caso para el que funciona mejor. Tenéis vuestra mesa y compartís la noche con otros grupos, así que el ambiente no depende de que seáis muchos." },
  { p: "Somos 80. ¿Podemos tener la sala para nosotros?", r: `Para grupos grandes, la opción es un evento en exclusiva: ${EXCLUSIVO.cuando.toLowerCase()}, en Oza, en otro espacio o en vuestras instalaciones.` },
  { p: "¿Hacéis comidas de empresa de Navidad?", r: "Sí, en exclusiva para la empresa: comida con DJ, show y fiesta al mediodía. Escribe con el día y el número de personas." },
  { p: "¿Las copas están incluidas?", r: `En la cena, la bebida sí. ${MENU.copas}` },
  { p: "¿Hay menú vegetariano, vegano o para alergias?", r: MENU.dietas },
  { p: "¿Se puede facturar a la empresa?", r: "Indícalo al reservar con los datos fiscales y te digo cómo se gestiona." },
];

function JsonLdEventos() {
  // Solo noches confirmadas y visibles en la página. Sin precio (los importes viven en /menus-precios/).
  const eventos = getConfirmadas().map((f) => {
    const [y, m, d] = f.fecha.split("-").map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Cena baile de Navidad · ${f.etiqueta}`,
      description: `Cena de Navidad para empresas y grupos con bebida durante la cena, show cómico y baile con DJ hasta las 3:00 en el ${SEDE.nombre} (A Coruña).`,
      startDate: `${f.fecha}T22:00:00+01:00`,
      endDate: `${fin}T03:00:00+01:00`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: SEDE.nombre, address: { "@type": "PostalAddress", streetAddress: SEDE.direccion, addressLocality: SEDE.ciudad, addressCountry: "ES" } },
      image: [`${SITE_URL}${FOTOS.navidad.src}`],
      organizer: { "@id": ORG_ID },
      url: `${SITE_URL}${RUTA_NAVIDAD}`,
    };
  });
  if (!eventos.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventos).replace(/</g, "\\u003c") }} />;
}

function Fechas() {
  const confirmadas = getConfirmadas();
  const aDemanda = getADemanda();
  return (
    <Seccion id="fechas" arena>
      <Titulo ante={`Navidad ${N.anio} · ${SEDE.nombre}`} titulo="Noches abiertas para cenas de empresa" texto="Cada grupo con su mesa y la noche compartida con otros grupos. ¿Ninguna os encaja? En exclusiva, el día que queráis." />
      {confirmadas.length > 0 ? (
        <div className="mt-10 space-y-8">
          {porMes(confirmadas).map(([mes, noches]) => (
            <div key={mes}>
              <h3 className="font-serif text-2xl font-semibold capitalize">{mes}</h3>
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {noches.map((f) => {
                  const [dia, num] = f.etiqueta.split(" ");
                  return (
                    <li key={f.fecha} className={`tarjeta flex flex-col items-center px-3 py-4 text-center ${f.completa ? "opacity-60" : ""}`}>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta-suave">{dia}</span>
                      <span className="mt-1 font-serif text-4xl font-semibold leading-none text-acento">{num}</span>
                      <span className="mt-2 text-xs font-semibold text-tinta-suave">{f.completa ? "Completa" : f.nota ?? "Confirmada"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="tarjeta mt-8 p-6 text-tinta-suave">Ahora mismo no hay noches publicadas. Escribe con tu fecha y te digo qué hay.</p>
      )}
      {aDemanda.length > 0 && (
        <div className="mt-10">
          <h3 className="font-serif text-2xl font-semibold">Se abren si se juntan grupos</h3>
          <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {aDemanda.map((f) => (
              <li key={f.fecha} className="flex flex-col items-center rounded-2xl border border-linea bg-marfil px-3 py-4 text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tinta-suave">{f.etiqueta.split(" ")[0]}</span>
                <span className="mt-1 font-serif text-2xl font-semibold">{f.etiqueta.split(" ")[1]}</span>
                <span className="mt-2 text-xs font-semibold text-tinta-suave">{f.completa ? "Completa" : "A demanda"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ContactoNavidad />
    </Seccion>
  );
}

export default function NavidadLanding({ variante }: { variante: Variante }) {
  const copy = COPY_NAVIDAD[variante];
  return (
    <>
      <Migas actual="Cenas de empresa de Navidad" />
      <Hero
        antetitulo={copy.antetitulo}
        titulo={copy.titular}
        texto={copy.bajada}
        foto={FOTOS.navidad}
        ctaPrincipal={{ href: "/reservas/?celebracion=navidad", texto: "Consultar fecha" }}
        ctaSecundario={{ href: "#fechas", texto: "Ver noches abiertas" }}
      />

      <Prosa
        ante="Cenas de empresa de Navidad en A Coruña"
        titulo="La cena de Navidad no va de comer. Va de equipo."
        aside={
          <div className="tarjeta p-6 sm:p-8">
            <p className="font-serif text-2xl font-semibold">En una noche</p>
            <ul className="lista-check mt-4 space-y-2">
              <li>Cena sentada con bebida durante la cena</li>
              <li>Una hora de show cómico</li>
              <li>DJ y baile hasta las 3</li>
              <li>Todo en el {SEDE.nombre}</li>
              <li>Una sola persona de contacto</li>
            </ul>
            <Link href="/menus-precios/" className="enlace mt-5 inline-block">Ver menú y precio</Link>
          </div>
        }
      >
        <p>Te voy a decir la verdad: la mayoría de las cenas de empresa se parecen. Restaurante de siempre, menú de siempre, el jefe con su discurso y, a la una, el camarero recogiendo sillas mientras el grupo se divide en tres bares.</p>
        <p>Y es una pena, <strong>porque la cena de Navidad es la única noche del año en la que el equipo se ve sin el trabajo de por medio</strong>. Es cuando el de administración descubre que el de almacén es un crack en la pista. Cuando el fichaje nuevo deja de serlo.</p>
        <p>Por eso aquí la noche está montada de principio a fin: cenáis en vuestra mesa, os reís una hora con el show y el DJ se encarga del resto hasta las tres. <strong>Nadie tiene que decidir «a dónde vamos ahora».</strong> Tú solo tienes que poner la fecha y el número de personas.</p>
      </Prosa>

      <BandaFotos fotos={[FOTOS.navidadMesa, FOTOS.navidadBrindis, FOTOS.empresas]} />

      <LineaNoche />

      <Pasos
        ante="Si te ha tocado organizarla"
        titulo="Cómo organizar la cena de empresa de Navidad, paso a paso"
        texto="Lo que hace que una cena de empresa salga redonda (y que a ti no te cueste tres semanas de mensajes)."
        pasos={[
          { t: "Propón dos fechas, no diez", d: "Elige un viernes y una alternativa, y pregunta solo eso. Diciembre es el mes con más demanda: cuanto antes, más opciones." },
          { t: "Cuenta personas, aunque sea a ojo", d: "Para consultar basta con «somos unos 20». El número exacto se cierra después." },
          { t: "Elige formato", d: "Con otros grupos, el ambiente viene hecho y funciona igual de bien para 6 que para 30. Si sois muchos o queréis algo solo vuestro, en exclusiva." },
          { t: "Deja claro quién paga qué", d: "Precio cerrado por persona con cena y bebida en la cena. Las copas del baile, aparte. Si invita la empresa, prepara los datos de facturación." },
          { t: "Pregunta alergias una sola vez", d: "Por escrito y al principio. Hay opción vegetariana, vegana y adaptación a alergias si se avisa." },
          { t: "Organiza la vuelta", d: "La noche acaba a las tres: taxis compartidos, un conductor que no bebe o traslado de grupo. Es lo menos glamuroso y lo más importante." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber antes de reservar"
        mejor={[
          "Todo en el mismo sitio: cena, show y baile. Nadie se pierde de camino al siguiente bar.",
          "El ambiente viene hecho: compartís sala con otros grupos que también vienen a celebrar.",
          "El show rompe el hielo, incluso entre departamentos que no se hablan.",
          "Precio cerrado por persona: cada uno sabe lo que paga desde el principio.",
          "Hablas con quien organiza, no con un intermediario.",
        ]}
        peor={[
          "Compartís la noche con otros grupos. Si queréis la sala solo para la empresa, pedid la opción en exclusiva.",
          "Las copas del baile no están incluidas: se pagan en la barra.",
          "A partir de medianoche no es plan para conversaciones tranquilas: hay show y luego música.",
          "Los viernes de diciembre son las noches más pedidas. Si tenéis fecha fija, consultad pronto.",
        ]}
      />

      <Casos
        ante="Así lo celebran otras empresas"
        titulo="Una cena de Navidad para cada tipo de equipo"
        texto="Ejemplos de formato según el tamaño y el plan de cada empresa."
        casos={[
          { etiqueta: "6 – 15 personas", t: "La oficina pequeña", d: "Gestorías, despachos, clínicas, tiendas. Vuestra mesa en la cena baile con otros grupos: ambiente de fiesta grande sin tener que ser muchos." },
          { etiqueta: "15 – 40 personas", t: "El departamento entero", d: "Varias mesas juntas, el show para romper el hielo entre secciones y la pista para cerrar el año a lo grande." },
          { etiqueta: "40 o más", t: "Toda la plantilla", d: "En exclusiva para la empresa: la sala para vosotros, en Oza, en otro espacio o en vuestras instalaciones." },
          { etiqueta: "Mediodía", t: "La comida de Navidad", d: "Para equipos con turnos o familias: comida con DJ y fiesta, en exclusiva, el día que mejor os venga." },
          { etiqueta: "Con clientes", t: "La cena de agradecimiento", d: "Un evento para clientes y proveedores con cena, humor y música, a medida de vuestra empresa." },
          { etiqueta: "Cuadrilla", t: "Los amigos de siempre", d: "No todo es la empresa: la cena de Navidad de la cuadrilla también tiene sitio." },
        ]}
      />

      <Seccion>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Titulo ante="El menú" titulo="Se cena bien. Luego ya se verá." texto="Cocina gallega para grupos y la bebida de la cena incluida. El precio por persona, en la página de Menús." />
          <div className="tarjeta p-6 sm:p-8"><ListaMenu /></div>
        </div>
      </Seccion>

      <Fechas />
      <Ambiente />

      <DosModalidades
        anteConjunta={`Noches de Navidad ${N.anio}`}
        ejemploConjunta="Vuestra mesa en una de las noches abiertas de Navidad, compartiendo show y pista con otros grupos. Ideal para equipos pequeños y medianos."
        ejemploMedida="La cena o comida de Navidad solo para vuestra empresa, el día que queráis: en Oza, en otro espacio o en vuestras instalaciones."
      />

      <Faq preguntas={FAQ_NAVIDAD} titulo="Cenas de empresa de Navidad: lo que todo el mundo pregunta" />
      <PostsRelacionados slugs={["ideas-cena-empresa-navidad-coruna", "organizar-cena-empresa-navidad-coruna", "juegos-animar-cena-empresa", "personajes-cena-empresa-navidad", "discurso-jefe-cena-navidad"].slice(0, 6)} />
      <Ocasiones excluir={RUTA_NAVIDAD} />
      <CtaFinal titulo="¿Cerramos la cena de Navidad de tu empresa?" texto="Dime la fecha que tenéis en mente y cuántos sois. Te respondo con disponibilidad." />
      <JsonLdMigas nombre="Cenas de empresa de Navidad" ruta={RUTA_NAVIDAD} />
      <JsonLdFaq preguntas={FAQ_NAVIDAD} />
      <JsonLdEventos />
    </>
  );
}
