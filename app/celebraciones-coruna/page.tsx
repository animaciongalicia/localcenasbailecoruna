import { Argumentos, BloqueConsulta, CtaFinal, DosModalidades, Espacio, Faq, Hero, Migas, Ocasiones } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CELEBRACIONES } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/celebraciones-coruna/";

export const metadata = meta({
  titulo: "Jubilaciones, aniversarios y celebraciones en A Coruña · Los7pc",
  descripcion: `Celebra una jubilación, un aniversario o un reencuentro en A Coruña con cena, show cómico y baile en el ${SEDE.nombre}. Cena conjunta o celebración a medida.`,
  ruta: RUTA,
  imagen: FOTOS.grupos.src,
});

export default function Celebraciones() {
  return (
    <>
      <Migas actual="Otras celebraciones" />
      <Hero
        antetitulo="Celebraciones en A Coruña"
        titulo="Jubilaciones, aniversarios y reencuentros con cena y baile"
        texto="Hay fechas que merecen algo más que una comida. Una cena temática con show y baile para despedir a un compañero, brindar por unos años de casados o juntar a la promoción."
        foto={FOTOS.grupos}
      />
      <Argumentos
        ante="Cada motivo, su noche"
        titulo="Celebraciones que se recuerdan"
        puntos={[
          { t: "Jubilaciones", d: "Para despedir a un compañero como se merece: cena con el equipo, unas risas con el show y baile para quien se anime." },
          { t: "Aniversarios", d: "Bodas de plata, de oro o un aniversario de pareja con los amigos de siempre." },
          { t: "Reencuentros", d: "La promoción del instituto, la cuadrilla de la mili o los del equipo de fútbol, veinte años después." },
          { t: "Homenajes y fiestas de grupo", d: "Un premio, una oposición aprobada o simplemente juntarse. Si es una excusa para celebrar, encaja." },
        ]}
      />
      <DosModalidades
        ejemploConjunta="Si sois un grupo de 6 a 30 personas, os unís a una cena baile conjunta: mesa propia y fiesta compartida."
        ejemploMedida="Si queréis un homenaje con discursos, un formato de pie o un horario distinto, se prepara una propuesta a medida."
      />
      <Espacio />
      <BloqueConsulta titulo="Cuéntame qué celebráis" celebracion="jubilacion" />
      <Faq preguntas={FAQ_CELEBRACIONES} />
      <Ocasiones excluir={RUTA} />
      <CtaFinal />
      <JsonLdMigas nombre="Otras celebraciones" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_CELEBRACIONES} />
    </>
  );
}
