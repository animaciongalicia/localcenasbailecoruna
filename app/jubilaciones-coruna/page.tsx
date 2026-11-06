import { Ambiente, Argumentos, CtaFinal, DosModalidades, Espacio, Faq, Hero, Migas, Ocasiones } from "@/components/Bloques";
import { MejorPeor, Pasos, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CELEBRACIONES } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/jubilaciones-coruna/";

export const metadata = meta({
  titulo: "Fiesta de jubilación en A Coruña: cena, show y baile · Los7pc",
  descripcion: `Organiza la fiesta de jubilación de un compañero en A Coruña: comida o cena, show cómico y baile. Con otros grupos en el ${SEDE.nombre} o en exclusiva, cualquier día del año. También aniversarios y reencuentros.`,
  ruta: RUTA,
  imagen: FOTOS.jubilaciones.src,
});

export default function Celebraciones() {
  return (
    <>
      <Migas actual="Jubilaciones y aniversarios" />
      <Hero
        antetitulo="Jubilaciones · aniversarios · reencuentros"
        titulo="Fiesta de jubilación en A Coruña, con cena, show y baile"
        texto="Despedir a un compañero después de tantos años merece algo más que una comida rápida. Cena o comida, unas risas con el show y baile, con la empresa y la familia juntas."
        foto={FOTOS.jubilaciones}
      />

      <Prosa ante="Celebrar una jubilación" titulo="Treinta años de trabajo no se despiden con un café y una tarjeta">
        <p>Una jubilación es de esas fechas que solo pasan una vez. Y casi siempre la organiza un compañero que no ha hecho esto nunca, con poco tiempo y mucha gente a la que contentar: jefes, compañeros de hoy, compañeros de antes y la familia.</p>
        <p><strong>La fórmula que funciona es sencilla:</strong> una buena comida o cena, un momento para las palabras y el regalo, una hora de humor para que todo el mundo se relaje y música para distintas generaciones. Ni discursos eternos ni tardes que se apagan a las seis.</p>
        <p>Podéis uniros a una cena baile con otros grupos en el {SEDE.nombre} o hacerlo en exclusiva, <strong>cualquier día del año, en comida o en cena</strong>, en Oza, en otro espacio o en la propia empresa.</p>
      </Prosa>

      <Pasos
        ante="Para quien organiza la jubilación"
        titulo="Cómo organizar una fiesta de jubilación, paso a paso"
        pasos={[
          { t: "Fecha con margen", d: "Que pueda venir la gente de antes, no solo la de ahora. Cuanto antes, más opciones." },
          { t: "Lista: empresa y familia", d: "Compañeros, jefes, pareja e hijos. Cuenta a todos aunque sea aproximado." },
          { t: "Comida o cena", d: "Si hay mucha familia o turnos, el mediodía funciona muy bien (en exclusiva)." },
          { t: "Palabras y regalo", d: "Dilo al reservar y se prevé el momento durante la comida o cena, antes del show." },
          { t: "Recoge fotos y anécdotas", d: "Un vídeo o unas fotos de sus años en la empresa: siempre emociona." },
          { t: "Formato", d: "Con otros grupos si sois pocos; en exclusiva si es un homenaje grande." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber"
        mejor={[
          "Empresa y familia, juntas en la misma celebración.",
          "Un momento previsto para las palabras y el regalo.",
          "Música para distintas generaciones.",
          "En exclusiva, el día y en el sitio que elijáis, también al mediodía.",
        ]}
        peor={[
          "En la cena con otros grupos compartís sala: para un homenaje con discursos largos, mejor en exclusiva.",
          "La cena con otros grupos es de abril a septiembre.",
          "Las copas del baile van aparte.",
        ]}
      />

      <Argumentos
        ante="Otras celebraciones"
        titulo="Aniversarios, reencuentros y homenajes"
        puntos={[
          { t: "Aniversarios", d: "Bodas de plata, de oro o un aniversario de pareja con los amigos de siempre." },
          { t: "Reencuentros", d: "La promoción del instituto, la cuadrilla de la mili o los del equipo de fútbol, veinte años después." },
          { t: "Homenajes y fiestas de grupo", d: "Un premio, una oposición aprobada o simplemente juntarse. Si es una excusa para celebrar, encaja." },
          { t: "Cenas de grupo", d: "Peñas, asociaciones y grupos de amigos que quieren cenar juntos y acabar bailando." },
        ]}
      />
      <Ambiente />
      <DosModalidades
        ejemploConjunta="Si sois un grupo de 6 a 30 personas, os unís a una cena baile con otros grupos: mesa propia y fiesta compartida."
        ejemploMedida="Para una jubilación grande o un homenaje con discursos: solo vuestro grupo, en comida o en cena, en Oza, en otro espacio o en la propia empresa."
      />
      <Espacio />
      <Faq preguntas={FAQ_CELEBRACIONES} titulo="Dudas sobre jubilaciones y celebraciones" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="Que su despedida se recuerde tanto como sus años de trabajo" />
      <JsonLdMigas nombre="Jubilaciones y aniversarios" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_CELEBRACIONES} />
    </>
  );
}
