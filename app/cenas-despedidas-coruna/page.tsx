import { Argumentos, CtaFinal, Faq, Hero, LineaNoche, MenuResumen, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_DESPEDIDA } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cenas-despedidas-coruna/";
const T = OFERTAS.temporada;

export const metadata = meta({
  titulo: "Cenas para despedidas en A Coruña: cena, show y fiesta · Los7pc",
  descripcion: `Cena de despedida de soltero o soltera en A Coruña con show cómico y DJ hasta las 3, en el ${SEDE.nombre}. ${T.precio} €/persona con bebida en la cena. Temporada ${T.temporada}.`,
  ruta: RUTA,
  imagen: FOTOS.celebrando.src,
});

export default function Despedidas() {
  return (
    <>
      <Migas actual="Despedidas" />
      <Hero
        antetitulo={`Despedidas · temporada ${T.temporada}`}
        titulo="Cena de despedida en A Coruña, con show y fiesta hasta las tres"
        texto="La parte de la noche, resuelta: cena con bebida, show cómico y baile con otros grupos que también vienen a darlo todo. Sin cambiar de local a medianoche."
        foto={FOTOS.celebrando}
      />
      <Argumentos
        ante="Cena de despedida conjunta"
        titulo="La noche que el grupo necesita"
        texto="Una despedida tiene dos momentos difíciles: dónde cenar todos juntos y dónde seguir después. Aquí son el mismo sitio."
        puntos={[
          { t: "Cena para todo el grupo", d: "Mesa propia, menú gallego y bebida durante la cena. Sin menús infinitos que negociar." },
          { t: "Show cómico", d: "Una hora de humor con el público, de medianoche a la una. Ideal para romper el hielo del todo." },
          { t: "Fiesta con otros grupos", d: "Más gente celebrando, más ambiente. Despedidas, cumpleaños y cuadrillas en la misma pista." },
          { t: "Precio por persona", d: `${T.precio} € con IVA. Fácil de dividir, fácil de cobrar al grupo.` },
        ]}
      />
      <LineaNoche />
      <MenuResumen />
      <Seccion>
        <div className="tarjeta grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Titulo
            as="h2"
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
