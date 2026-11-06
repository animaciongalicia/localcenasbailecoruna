import { Ambiente, CtaFinal, DosModalidades, Espacio, Faq, Hero, Incluye, LineaNoche, MenuResumen, Ocasiones, Trayectoria } from "@/components/Bloques";
import { MejorPeor, Pasos, PostsRelacionados, Prosa } from "@/components/Contenido";
import { JsonLdFaq } from "@/components/JsonLd";
import { FAQ_HOME } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

export const metadata = meta({
  titulo: "Cena baile en A Coruña con show y DJ hasta las 3 · Los7pc",
  descripcion: `Cenas baile para grupos en A Coruña: cena, show cómico y DJ hasta las 3 en el ${SEDE.nombre}. Cumpleaños, empresas, despedidas y más.`,
  ruta: "/",
  imagen: FOTOS.baile.src,
});

export default function Inicio() {
  return (
    <>
      <Hero
        antetitulo={`A Coruña · ${SEDE.nombre}`}
        titulo="Cena baile con espectáculo en A Coruña"
        texto={`Celebra tu cumpleaños, reúne a tus compañeros o ven con tu grupo a una noche de cena, show cómico y DJ hasta las tres. En el ${SEDE.nombre}.`}
      />

      <Prosa ante="Cenas temáticas con fiesta" titulo="Ni restaurante normal, ni discoteca">
        <p>Seguro que te suena: cena en un restaurante, sobremesa larga y, a la una, el camarero apilando sillas. Medio grupo se va a casa, el otro medio se reparte por tres bares y la celebración se acaba sin que nadie lo decida.</p>
        <p><strong>Aquí la noche no se rompe.</strong> Cenas en tu mesa, te ríes una hora con el show cómico y el DJ se encarga de que nadie mire el reloj hasta las tres. Todo en el mismo sitio, con otros grupos que también vienen a celebrar.</p>
        <p>Llevamos más de quince años haciéndolo en A Coruña. Primero en hoteles y salas de la ciudad; ahora, en el {SEDE.nombre}. Y la fórmula sigue siendo la misma: <strong>tú pones la gente, la noche ya está montada.</strong></p>
      </Prosa>

      <Incluye />

      <Pasos
        ante="Cómo funciona"
        titulo="De la idea a la pista, en tres pasos"
        pasos={[
          { t: "Consultas fecha", d: "Por WhatsApp, email o teléfono: qué celebráis, qué día y cuántos sois, aunque sea aproximado." },
          { t: "Te confirmo hueco", d: "Te respondo con disponibilidad y te paso por escrito lo que incluye y las condiciones." },
          { t: "Reservas y a disfrutar", d: "Con el pago de confirmación la mesa es vuestra. El día de la cena solo tenéis que llegar." },
        ]}
      />

      <DosModalidades />
      <Ocasiones />
      <LineaNoche />
      <Ambiente />

      <MejorPeor
        ante="Sin vender humo"
        titulo="¿Es tu plan?"
        tituloMejor="Es para ti si…"
        tituloPeor="Quizá no es para ti si…"
        mejor={[
          "Quieres cenar bien, reírte y bailar sin cambiar de sitio.",
          "Organizas para un grupo y no quieres pasarte semanas coordinando.",
          "Te gusta el ambiente de sala llena, con otros grupos de celebración.",
          "Buscas un plan que funcione para los de 25 y para los de 65.",
        ]}
        peor={[
          "Buscas una cena tranquila para conversar hasta tarde: a medianoche empieza el show.",
          "Quieres la sala solo para tu grupo: entonces lo tuyo es la opción en exclusiva.",
          "Esperas las copas incluidas toda la noche: la bebida de la cena sí lo está; las copas del baile, no.",
        ]}
      />

      <MenuResumen />
      <Espacio />
      <Trayectoria />
      <Faq preguntas={FAQ_HOME} />
      <PostsRelacionados slugs={["organizar-cena-empresa-navidad-coruna", "celebrar-50-cumpleanos-coruna", "personajes-cena-empresa-navidad"]} titulo="Consejos para organizar (y reírse un poco)" />
      <CtaFinal />
      <JsonLdFaq preguntas={FAQ_HOME} />
    </>
  );
}
