import { BandaFotos, Ambiente, Argumentos, CtaFinal, Faq, Hero, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { MejorPeor, Pasos, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas, ORG_ID } from "@/components/JsonLd";
import { FOTOS } from "@/lib/fotos";
import type { Pregunta } from "@/lib/faq";
import { meta } from "@/lib/seo";
import { EXCLUSIVO, MENU, SEDE, SITE_URL } from "@/lib/sitio";

const RUTA = "/eventos-privados-coruna/";

export const metadata = meta({
  titulo: "Fiestas privadas en A Coruña con cena, DJ y show · Los7pc",
  descripcion: `Fiesta privada solo para tu grupo: comida o cena, DJ, show y baile. En el ${SEDE.nombre}, en otro espacio o en tu local, cualquier día del año.`,
  ruta: RUTA,
  imagen: FOTOS.privados.src,
});

const FAQ_PRIVADOS: Pregunta[] = [
  { p: "¿Qué días se puede hacer un evento en exclusiva?", r: `${EXCLUSIVO.cuando}. ${EXCLUSIVO.agenda}` },
  { p: "¿Dónde se celebra?", r: `Donde mejor encaje: en el ${SEDE.nombre}, en otro espacio de la zona o en vuestro propio local (restaurante, empresa, finca). Si ya tenéis sitio, se lleva el concepto completo hasta allí.` },
  { p: "¿Cuánto cuesta?", r: "Se presupuesta cada evento según la fecha, el número de personas, la comida y el lugar. Pide propuesta y te paso un presupuesto cerrado antes de comprometer nada." },
  { p: "¿Es lo mismo que la cena baile de los sábados?", r: "Es el mismo concepto (comida o cena, DJ, show cómico y baile), pero solo para tu grupo y en la fecha y el sitio que elijáis. La cena baile con otros grupos es de abril a septiembre." },
  { p: "¿Podemos quitar el show o el DJ?", r: "Sí. Puedes quedarte con la parte que queráis: solo DJ, solo show, o todo." },
  { p: "¿Hay opciones para alergias o dietas?", r: MENU.dietas },
];

function JsonLdServicioPrivado() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Eventos privados con cena, DJ y show cómico en A Coruña",
    serviceType: "Organización de fiestas privadas con cena y baile",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "A Coruña" },
    description: `${EXCLUSIVO.cuando}. En el ${SEDE.nombre}, en otro espacio o en el local del cliente. Presupuesto personalizado.`,
    url: `${SITE_URL}${RUTA}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function EventosPrivados() {
  return (
    <>
      <Migas actual="Eventos privados" />
      <Hero
        antetitulo="Eventos privados · A Coruña"
        titulo="Tu fiesta privada, con cena, DJ y show solo para tu grupo"
        texto={`La noche que funciona en el ${SEDE.nombre} desde hace temporadas, en exclusiva para vosotros. ${EXCLUSIVO.cuando}: en Oza, en otro espacio o en vuestro propio local.`}
        foto={FOTOS.privados}
        ctaPrincipal={{ href: "/reservas/?modalidad=medida", texto: "Pedir propuesta" }}
        ctaSecundario={{ href: "#donde", texto: "Dónde se puede hacer" }}
      />

      <Prosa ante="Local para fiestas privadas en A Coruña" titulo="Cuando la celebración es solo vuestra">
        <p>Hay fiestas que piden la sala para vosotros: un cumpleaños redondo con cien invitados, la jubilación de alguien muy querido, la plantilla entera de la empresa o un aniversario que merece algo más que una comida.</p>
        <p>Para esas, el formato que funciona en las cenas baile <strong>se monta solo para tu grupo</strong>: comida o cena, DJ, show cómico y fiesta. Y no depende de la temporada ni del sitio: <strong>cualquier día del año, en el {SEDE.nombre}, en otro espacio o en tu propio local</strong>, restaurante, empresa o finca.</p>
        <p>En el {SEDE.nombre} caben <strong>unas {SEDE.sentados} personas sentadas o cerca de {SEDE.dePie} en catering de pie</strong>, y se puede traer <strong>grupo de música en directo</strong>, algo que pocos locales permiten.</p>
        <p>El DJ y el show son propios, sin subcontratas. Por eso cada fecha depende de la agenda: cuanto antes preguntes, más opciones.</p>
      </Prosa>

      <BandaFotos fotos={[FOTOS.buffet, FOTOS.canapes, FOTOS.baile]} />

      <Seccion id="donde" arena>
        <Titulo ante="Tú eliges el sitio" titulo="Tres maneras de montarla" texto="El formato viaja: la comida o la cena, el DJ, el show y la fiesta van donde esté tu grupo." />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {EXCLUSIVO.donde.map((d, i) => (
            <li key={d.valor} className="tarjeta p-6">
              <span className="font-serif text-4xl font-semibold text-acento">{i + 1}</span>
              <h3 className="mt-3 font-serif text-2xl font-semibold">{d.etiqueta}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{d.texto}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Argumentos
        ante="Por qué en exclusiva"
        titulo="Para cuando la celebración es solo vuestra"
        texto="Hay fiestas que piden la sala para vosotros: un cumpleaños redondo, una jubilación con discursos o la empresa entera."
        puntos={[
          { t: "Cualquier día del año", d: "No dependes de la temporada de abril a septiembre. Entre semana, fin de semana, mediodía o noche." },
          { t: "Comida o cena", d: "Menú sentado o catering de pie, según el plan y el espacio." },
          { t: "DJ y show propios", d: "El mismo equipo de las cenas baile. Sin subcontratas ni sorpresas." },
          { t: "Un solo interlocutor", d: "Hablas con quien organiza, de la propuesta al último baile." },
          { t: "A tu medida", d: "Con show o sin él, con más baile o más sobremesa. Se ajusta al grupo." },
          { t: "Más de 15 años haciéndolo", d: `Primero en hoteles y salas de la ciudad; ahora en el ${SEDE.nombre} y donde nos llamen.` },
        ]}
      />

      <Pasos
        ante="Cómo funciona"
        titulo="De la idea a la fiesta, en cuatro pasos"
        pasos={[
          { t: "Me cuentas la idea", d: "Fecha (o fechas posibles), número de personas, comida o cena y dónde lo imagináis." },
          { t: "Te paso propuesta", d: "Formato, lo que incluye y presupuesto cerrado, por escrito." },
          { t: "Confirmas", d: "Con la confirmación se bloquea la fecha en la agenda del DJ y del show." },
          { t: "Disfrutáis", d: "El día del evento solo tenéis que llegar. El resto está montado." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber"
        mejor={[
          "La sala, la música y el show solo para tu grupo.",
          "Cualquier día del año, en comida o en cena.",
          "En Oza, en otro espacio o en tu propio local.",
          "Presupuesto cerrado antes de confirmar.",
        ]}
        peor={[
          "Cada fecha depende de la agenda del DJ y del show: consulta con tiempo.",
          "Si se celebra en otro espacio, el alquiler de ese espacio puede ir aparte; te lo detallo en la propuesta.",
          "No es para bodas: el formato está pensado para fiestas, empresas y celebraciones.",
        ]}
      />

      <Seccion>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Titulo ante="Qué incluye" titulo="Lo que puedes tener" texto={EXCLUSIVO.agenda} />
          <ul className="lista-check tarjeta space-y-3 p-6 text-lg sm:p-8">
            {EXCLUSIVO.incluye.map((i) => <li key={i}>{i}</li>)}
            <li>Presupuesto personalizado, cerrado antes de confirmar</li>
          </ul>
        </div>
      </Seccion>
      <Ambiente />
      <Faq preguntas={FAQ_PRIVADOS} titulo="Dudas sobre eventos privados" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="¿Tienes ya la fecha?" texto="Las fechas en exclusiva dependen de la agenda del DJ y del show. Pregunta con tiempo." />
      <JsonLdMigas nombre="Eventos privados" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_PRIVADOS} />
      <JsonLdServicioPrivado />
    </>
  );
}
