import { CtaFinal, DosModalidades, Espacio, Faq, Fechas, Hero, Incluye, LineaNoche, MenuResumen, Ocasiones, Trayectoria, Argumentos, Ambiente } from "@/components/Bloques";
import { JsonLdFaq, JsonLdServicio } from "@/components/JsonLd";
import { FAQ_HOME } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const T = OFERTAS.temporada;

export const metadata = meta({
  titulo: "Cenas con espectáculo y baile en A Coruña · Los7pc",
  descripcion: `Cena baile con show cómico y DJ hasta las 3 en el ${SEDE.nombre}. Para cumpleaños, empresas, despedidas y grupos. ${T.precio} € por persona (IVA incluido), temporada ${T.temporada}.`,
  ruta: "/",
  imagen: FOTOS.baile.src,
});

export default function Inicio() {
  return (
    <>
      <Hero
        antetitulo={`A Coruña · ${SEDE.nombre}`}
        titulo="Cenas con espectáculo y baile en A Coruña"
        texto={`Celebra tu cumpleaños, reúne a tus compañeros o ven con tu grupo a una noche de cena, show cómico y DJ hasta las tres. En el ${SEDE.nombre}.`}
      />
      <Incluye />
      <Argumentos
        ante="Por qué aquí"
        titulo="Ni restaurante normal, ni discoteca"
        texto="Una cena temática con fiesta: el plan completo para grupos que quieren cenar bien, reírse un rato y bailar sin cambiar de sitio."
        puntos={[
          { t: "Todo en el mismo sitio", d: "Cena, show y pista de baile. Nadie se pierde de camino al siguiente bar." },
          { t: "Ambiente hecho desde el primer minuto", d: "Compartís la noche con otros grupos que también vienen a celebrar." },
          { t: "Reserva directa", d: "Hablas con quien organiza la noche, no con un intermediario que la revende." },
          { t: "Más de 15 años haciéndolo", d: "Cenas baile en A Coruña temporada tras temporada. Ahora, en Oza." },
        ]}
      />
      <DosModalidades />
      <Ocasiones />
      <LineaNoche />
      <Ambiente />
      <MenuResumen />
      <Fechas />
      <Espacio />
      <Trayectoria />
      <Faq preguntas={FAQ_HOME} />
      <CtaFinal />
      <JsonLdServicio />
      <JsonLdFaq preguntas={FAQ_HOME} />
    </>
  );
}
