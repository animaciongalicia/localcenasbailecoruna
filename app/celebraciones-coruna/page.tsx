import { GaleriaNoches, BandaFotos, PruebaSocial, Ambiente, CtaFinal, DosModalidades, Faq, Hero, LineaNoche, Migas, Ocasiones } from "@/components/Bloques";
import { Pasos, PostsRelacionados, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_HOME } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/celebraciones-coruna/";
const FAQ = FAQ_HOME.filter((q) => !/aparcar/.test(q.p));

export const metadata = meta({
  titulo: "Local de celebraciones en A Coruña con show · Los7pc",
  descripcion: `Cumpleaños, empresas, Navidad, despedidas, jubilaciones y eventos privados en A Coruña: cena, show cómico y DJ hasta las 3.`,
  ruta: RUTA,
  imagen: FOTOS.brindis.src,
});

export default function Celebraciones() {
  return (
    <>
      <Migas actual="Celebraciones" />
      <Hero
        antetitulo="Cada celebración tiene su noche"
        titulo="Local de celebraciones en A Coruña con cena, show y baile"
        texto="Cumpleaños, cenas de empresa, Navidad, despedidas, jubilaciones o una fiesta solo vuestra. La fórmula es la misma: cena, show cómico y baile hasta las tres. Lo que cambia es tu motivo."
        foto={FOTOS.brindis}
      />
      <Ocasiones excluir="/celebraciones-coruna/" ante="Elige tu motivo" titulo="¿Qué celebráis?" texto="Cada página explica cómo organizarlo, qué incluye y lo que conviene saber antes." />

      <Prosa ante="Salón de celebraciones con fiesta" titulo="Por qué funciona para cualquier celebración">
        <p>Da igual que sea el cumpleaños de tu madre, la cena de la oficina o la despedida de tu mejor amigo. <strong>Lo que hace buena una celebración es lo mismo:</strong> comer bien, reírse juntos y acabar la noche sin que nadie tenga que decidir «a dónde vamos ahora».</p>
        <p>Por eso la noche está montada de principio a fin: cena con bebida, una hora de show cómico que rompe el hielo y DJ con música para distintas generaciones hasta las tres. En el {SEDE.nombre}, compartiendo ambiente con otros grupos, o en exclusiva, el día y en el sitio que elijáis.</p>
      </Prosa>

      <BandaFotos fotos={[FOTOS.cumpleanos, FOTOS.jubilaciones, FOTOS.navidadBrindis]} />

      <DosModalidades />

      <Pasos
        ante="Cómo funciona"
        titulo="De la idea a la pista, en tres pasos"
        pasos={[
          { t: "Consultas fecha", d: "Por WhatsApp, email o teléfono: qué celebráis, qué día y cuántos sois, aunque sea aproximado." },
          { t: "Te confirmo hueco", d: "Te respondo con disponibilidad y te paso por escrito lo que incluye y las condiciones." },
          { t: "Reservas y a disfrutar", d: "Con el pago de confirmación la mesa es vuestra. El día de la cena solo tenéis que llegar." },
        ]}
      />
      <LineaNoche />
      <Ambiente />
      <PruebaSocial />
      <GaleriaNoches titulo="Así se vive una noche de celebración" desde={34} max={8} />
      <Faq preguntas={FAQ} />
      <PostsRelacionados slugs={["organizar-cena-empresa-navidad-coruna", "celebrar-50-cumpleanos-coruna", "personajes-cena-empresa-navidad"]} titulo="Ideas y consejos para tu celebración" />
      <CtaFinal />
      <JsonLdMigas nombre="Celebraciones" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ} />
    </>
  );
}
