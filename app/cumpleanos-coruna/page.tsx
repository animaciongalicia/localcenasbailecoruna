import { Argumentos, BloqueConsulta, CtaFinal, DosModalidades, Faq, Hero, LineaNoche, Migas, Ocasiones } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CUMPLE } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cumpleanos-coruna/";

export const metadata = meta({
  titulo: "Celebrar un cumpleaños en A Coruña con cena, show y baile · Los7pc",
  descripcion: `Cumpleaños de adultos en A Coruña: cena, show cómico y DJ hasta las 3 en el ${SEDE.nombre}. Cena conjunta a ${OFERTAS.temporada.precio} €/persona o celebración a medida.`,
  ruta: RUTA,
  imagen: FOTOS.celebrando.src,
});

export default function Cumpleanos() {
  return (
    <>
      <Migas actual="Cumpleaños" />
      <Hero
        antetitulo="Cumpleaños en A Coruña"
        titulo="Tu cumpleaños, con cena, show y baile hasta las tres"
        texto="Tú pones a la gente. La cena, las risas y la pista de baile ya están montadas. Sin cocinar, sin recoger y sin buscar dónde seguir la fiesta."
        foto={FOTOS.celebrando}
      />
      <Argumentos
        ante="Pensado para quien organiza"
        titulo="Tú solo tienes que invitar"
        texto="Organizar un cumpleaños de adultos suele acabar en una cadena de mensajes, un restaurante que cierra a la una y nadie que sepa a dónde ir después. Aquí no."
        puntos={[
          { t: "Un plan que gusta a todos", d: "Cena para los que vienen a charlar, show para reírse y baile para los que no quieren irse a casa." },
          { t: "Da igual si se conocen", d: "Amigos del trabajo, de la infancia y familia en la misma mesa. La noche se encarga de mezclarlos." },
          { t: "Precio cerrado por persona", d: `En la cena conjunta, ${OFERTAS.temporada.precio} € con IVA. Cada invitado sabe lo que paga desde el principio.` },
          { t: "Los 30, los 50 o los 70", d: "Música para distintas generaciones. Cada uno baila lo suyo (o mira desde la mesa)." },
        ]}
      />
      <DosModalidades
        ejemploConjunta="Ideal si sois entre 6 y 20 amigos: vuestra mesa, vuestra tarta si la habéis pactado antes, y el resto de la sala también de celebración."
        ejemploMedida="Para un cumpleaños grande o redondo: tu propio formato, con menú sentado o picoteo de pie, con DJ o con show. Precio según fecha y número de invitados."
      />
      <LineaNoche />
      <BloqueConsulta titulo="Cuéntame tu cumpleaños" celebracion="cumpleanos" />
      <Faq preguntas={FAQ_CUMPLE} titulo="Dudas típicas de un cumpleaños" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="Que el cumpleaños se recuerde por la fiesta" />
      <JsonLdMigas nombre="Cumpleaños" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_CUMPLE} />
    </>
  );
}
