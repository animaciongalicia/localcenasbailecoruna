import { Argumentos, CtaFinal, Faq, Hero, LineaNoche, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { IconoWhatsapp } from "@/components/Iconos";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Pregunta } from "@/lib/faq";

const RUTA = "/cenas-navidad-coruna/";
const N = OFERTAS.navidad;
const WA = `Hola, quiero consultar una cena de Navidad ${N.anio} en el ${SEDE.nombre}.`;

// URL estable sin año: cada campaña actualiza el año en el contenido (lib/sitio.ts → OFERTAS.navidad).
export const metadata = meta({
  titulo: `Cenas de Navidad en A Coruña ${N.anio} para empresas y grupos · Los7pc`,
  descripcion: `Cenas y comidas de Navidad en A Coruña: cena, show cómico y baile en el ${SEDE.nombre}. ${N.precio} € por persona en ${N.anio}. Fechas de ${N.temporada}.`,
  ruta: RUTA,
  imagen: FOTOS.salon.src,
});

const FAQ_NAVIDAD: Pregunta[] = [
  { p: `¿Cuánto cuesta la cena de Navidad ${N.anio}?`, r: `${N.precio} € por persona. Fechas, condiciones y reserva, en la web de la campaña: ${N.url.replace("https://", "")}.` },
  { p: "¿Es lo mismo que la cena baile de verano?", r: "El formato es parecido (cena, show y baile), pero Navidad es una campaña aparte con sus propias fechas, precio y condiciones." },
  { p: "¿Hacéis comidas de empresa en Navidad?", r: "Se pueden pedir comidas o cenas a medida para empresas y grupos en noviembre y diciembre. Escribe con fecha y número de personas y te digo si es posible." },
];

export default function Navidad() {
  return (
    <>
      <Migas actual="Navidad" />
      <Hero
        antetitulo={`Navidad ${N.anio} · ${N.temporada}`}
        titulo="Cenas de Navidad en A Coruña para empresas y grupos"
        texto={`La cena de Navidad de la empresa o de la cuadrilla, con show cómico y baile en el ${SEDE.nombre}. ${N.precio} € por persona en ${N.anio}.`}
        foto={FOTOS.salon}
        precio={false}
        ctaSecundario={{ href: N.url, texto: "Ver fechas y reservar" }}
      />
      <Seccion arena>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Titulo
            ante="Fechas y reservas"
            titulo={`Las noches de Navidad ${N.anio} están en su propia web`}
            texto="Allí tienes las fechas abiertas, el precio, lo que incluye y las condiciones de reserva de la campaña. Se actualiza a medida que entran grupos."
          />
          <div className="tarjeta flex flex-col gap-3 p-6">
            <a href={N.url} className="btn-principal">Ver fechas de Navidad {N.anio}</a>
            <a href={whatsappUrl(WA)} className="btn-wa" data-ubicacion="navidad" data-campana={N.id} target="_blank" rel="noopener"><IconoWhatsapp /> Consultar por WhatsApp</a>
          </div>
        </div>
      </Seccion>
      <Argumentos
        ante="Para empresas y cuadrillas"
        titulo="Una cena de Navidad que no se queda en el turrón"
        puntos={[
          { t: "Plan completo", d: "Cena, show cómico y baile. Sin tener que buscar dónde ir a la una." },
          { t: "Para grupos de cualquier tamaño", d: "Desde un departamento pequeño hasta la plantilla entera." },
          { t: "Comidas y cenas a medida", d: "Si buscas otro formato para la empresa, se prepara una propuesta." },
          { t: "Reserva directa", d: "Con quien organiza las cenas desde hace más de 15 años." },
        ]}
      />
      <LineaNoche />
      <Faq preguntas={FAQ_NAVIDAD} titulo="Navidad: lo esencial" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="¿Ya tienes fecha para la cena de Navidad?" texto="Dime el día y cuántos sois. Te respondo con disponibilidad y opciones." />
      <JsonLdMigas nombre="Navidad" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_NAVIDAD} />
    </>
  );
}
