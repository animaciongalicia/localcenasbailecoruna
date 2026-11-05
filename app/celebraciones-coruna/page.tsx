import { Argumentos, CtaFinal, DosModalidades, Espacio, Faq, Hero, Migas, Ocasiones } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CELEBRACIONES } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/celebraciones-coruna/";

export const metadata = meta({
  titulo: "Fiesta de jubilación en A Coruña: cena, show y baile · Los7pc",
  descripcion: `Organiza la fiesta de jubilación de un compañero en A Coruña: comida o cena, show cómico y baile. Con otros grupos en el ${SEDE.nombre} o en exclusiva, cualquier día del año. También aniversarios y reencuentros.`,
  ruta: RUTA,
  imagen: FOTOS.grupos.src,
});

export default function Celebraciones() {
  return (
    <>
      <Migas actual="Jubilaciones y aniversarios" />
      <Hero
        antetitulo="Jubilaciones · aniversarios · reencuentros"
        titulo="Fiesta de jubilación en A Coruña, con cena, show y baile"
        texto="Despedir a un compañero después de tantos años merece algo más que una comida rápida. Cena o comida, unas risas con el show y baile, con la empresa y la familia juntas."
        foto={FOTOS.grupos}
      />
      <Argumentos
        ante="Para quien organiza la jubilación"
        titulo="Todo lo que una jubilación necesita"
        texto="Suele organizarla un compañero que no ha hecho esto nunca. Esto es lo que se resuelve de una vez."
        puntos={[
          { t: "El momento del discurso", d: "Si queréis unas palabras y el regalo durante la cena, dilo al reservar y se prevé el momento, antes del show." },
          { t: "Empresa y familia, juntas", d: "Compañeros, jefes, pareja e hijos en la misma celebración. La música es para distintas generaciones." },
          { t: "Comida o cena", d: "Si el grupo prefiere el mediodía, también se hace. En exclusiva, cualquier día del año." },
          { t: "En Oza o donde queráis", d: "En el Club Náutico de Oza, en otro espacio o en un local vuestro. El concepto completo va con el equipo." },
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
      <DosModalidades
        ejemploConjunta="Si sois un grupo de 6 a 30 personas, os unís a una cena baile conjunta: mesa propia y fiesta compartida."
        ejemploMedida="Para una jubilación grande o un homenaje con discursos: solo vuestro grupo, en comida o en cena, en Oza, en otro espacio o en la propia empresa."
      />
      <Espacio />
      <Faq preguntas={FAQ_CELEBRACIONES} />
      <Ocasiones excluir={RUTA} />
      <CtaFinal />
      <JsonLdMigas nombre="Jubilaciones y aniversarios" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_CELEBRACIONES} />
    </>
  );
}
