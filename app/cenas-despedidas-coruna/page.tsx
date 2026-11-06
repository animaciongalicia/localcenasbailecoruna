import { BandaFotos, Ambiente, CtaFinal, Faq, Hero, Incluye, LineaNoche, MenuResumen, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { MejorPeor, Pasos, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_DESPEDIDA } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cenas-despedidas-coruna/";
const T = OFERTAS.temporada;

export const metadata = meta({
  titulo: "Cena de despedida en A Coruña con show y fiesta · Los7pc",
  descripcion: `Cena de despedida de soltero o soltera en A Coruña: cena con bebida, show cómico y DJ hasta las 3, con otros grupos de celebración.`,
  ruta: RUTA,
  imagen: FOTOS.despedidas.src,
});

export default function Despedidas() {
  return (
    <>
      <Migas actual="Despedidas" />
      <Hero
        antetitulo={`Despedidas · temporada ${T.temporada}`}
        titulo="Cena de despedida en A Coruña, con show y fiesta hasta las tres"
        texto="La parte de la noche, resuelta: cena con bebida, show cómico y baile con otros grupos que también vienen a darlo todo. Sin cambiar de local a medianoche."
        foto={FOTOS.despedidas}
      />

      <Prosa ante="Cenas de despedida de soltero y soltera" titulo="La noche que el grupo necesita (y que el organizador agradece)">
        <p>Una despedida tiene dos momentos críticos: dónde cenar todos juntos y dónde seguir después sin perder a la mitad por el camino. <strong>Aquí son el mismo sitio.</strong></p>
        <p>Cenáis en vuestra mesa, el show cómico pone a todo el mundo en modo fiesta y el DJ hace el resto hasta las tres. Y como compartís sala con otras despedidas, cumpleaños y cuadrillas, el ambiente viene hecho desde el primer minuto.</p>
        <p>Más de quince años organizando cenas de despedida en A Coruña dan para saber una cosa: <strong>lo que se recuerda no es el menú, es la noche.</strong></p>
      </Prosa>

      <BandaFotos fotos={[FOTOS.baile, FOTOS.cumpleanosFiesta, FOTOS.celebrando]} />

      <Incluye titulo="Qué incluye la cena de despedida" />

      <Pasos
        ante="Para el que organiza la despedida"
        titulo="Cómo cerrar la noche de la despedida sin dramas"
        pasos={[
          { t: "Fecha primero", d: `La temporada es ${T.temporada} y los sábados vuelan. Consulta en cuanto tengáis fecha.` },
          { t: "Número aproximado", d: "Basta con un número orientativo para consultar. Se ajusta después." },
          { t: "Precio por persona", d: "Cerrado y fácil de dividir: cada uno sabe lo que paga. Las copas del baile, aparte." },
          { t: "El momento del protagonista", d: "Si queréis algún detalle para el novio o la novia, dilo al reservar." },
          { t: "El resto del día", d: "Actividades, alojamiento o packs completos: despedidascoruna.es." },
          { t: "La vuelta", d: "Se acaba a las tres: dejad pensado cómo volver." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber"
        mejor={[
          "Cena, show y baile sin cambiar de sitio: nadie se pierde por el camino.",
          "Ambiente de fiesta con otros grupos desde el primer minuto.",
          "Precio cerrado por persona, fácil de cobrar al grupo.",
          "Válido para despedidas de él, de ella y mixtas.",
        ]}
        peor={[
          "Compartís sala con otros grupos: si queréis la noche solo para vosotros, pedid la opción en exclusiva.",
          "Las copas del baile no están incluidas.",
          "Esta web es la parte de la noche. Las actividades de día están en despedidascoruna.es.",
        ]}
      />

      <LineaNoche />
      <MenuResumen />
      <Ambiente />
      <Seccion>
        <div className="tarjeta grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Titulo
            ante="¿Y el resto del día?"
            titulo="Actividades, alojamiento y packs completos"
            texto="Barco, actividades de tarde o alojamiento para el grupo los tienes en una web aparte, del mismo grupo. Esta web se centra en la cena y la fiesta."
          />
          <a href="https://despedidascoruna.es" className="btn-linea" rel="noopener">Ver despedidascoruna.es</a>
        </div>
      </Seccion>
      <Faq preguntas={FAQ_DESPEDIDA} titulo="Dudas de despedida" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="La despedida, en buenas manos" />
      <JsonLdMigas nombre="Despedidas" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_DESPEDIDA} />
    </>
  );
}
