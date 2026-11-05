import Link from "next/link";
import { Argumentos, BloqueConsulta, CtaFinal, DosModalidades, Faq, Hero, LineaNoche, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CUMPLE } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cumpleanos-coruna/";

export const metadata = meta({
  titulo: "Dónde celebrar un cumpleaños de adultos en A Coruña · Los7pc",
  descripcion: `Sitio para celebrar tu cumpleaños (30, 40, 50…) en A Coruña: cena, show cómico y DJ hasta las 3 en el ${SEDE.nombre}. Cena conjunta a ${OFERTAS.temporada.precio} €/persona o celebración a medida.`,
  ruta: RUTA,
  imagen: FOTOS.celebrando.src,
});

export default function Cumpleanos() {
  return (
    <>
      <Migas actual="Cumpleaños" />
      <Hero
        antetitulo="Cumpleaños en A Coruña"
        titulo="Celebra tu cumpleaños en A Coruña con cena, show y baile"
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
      <Seccion arena>
        <Titulo ante="Cumpleaños redondos" titulo="30, 40, 50, 60… cada década se celebra distinto" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { t: "Celebrar 40 años", d: "Amigos de siempre, pareja y algún compañero de trabajo. Cena tranquila, risas con el show y la pista hasta las tres, como a los veinte (o casi)." },
            { t: "Celebrar 50 años", d: "Familia y amigos de toda la vida en la misma mesa. Música para distintas generaciones y un plan que no obliga a nadie a bailar… aunque más de uno acaba en la pista." },
            { t: "Celebrar 30 años", d: "La cuadrilla al completo, cena sin complicaciones y fiesta sin cambiar de local a medianoche." },
            { t: "Celebrar 60 o más", d: "Para quien quiere celebrarlo por todo lo alto con hijos, nietos y amigos. Si el grupo es grande, en exclusiva y a la hora que mejor os venga, también al mediodía." },
          ].map((x) => (
            <article key={x.t} className="tarjeta p-6">
              <h3 className="font-serif text-2xl font-semibold">{x.t}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{x.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-prosa text-tinta-suave">
          ¿Quieres el cumpleaños solo para tus invitados, cualquier día del año o en otro sitio? <Link href="/eventos-privados-coruna/" className="enlace">Mira los eventos privados en exclusiva</Link>.
        </p>
      </Seccion>
      <DosModalidades
        ejemploConjunta="Ideal si sois entre 6 y 20 amigos: vuestra mesa, vuestra tarta si la habéis pactado antes, y el resto de la sala también de celebración."
        ejemploMedida="Para un cumpleaños grande o redondo: solo tus invitados, cualquier día del año, en comida o en cena. En Oza, en otro espacio o en tu casa o finca. Precio según fecha y número de invitados."
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
