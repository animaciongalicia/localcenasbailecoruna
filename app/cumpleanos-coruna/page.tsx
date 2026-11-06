import Link from "next/link";
import { Ambiente, CtaFinal, DosModalidades, Faq, Hero, Incluye, LineaNoche, Migas, Ocasiones, Seccion, Titulo } from "@/components/Bloques";
import { MejorPeor, Pasos, PostsRelacionados, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_CUMPLE } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/cumpleanos-coruna/";

export const metadata = meta({
  titulo: "Dónde celebrar un cumpleaños de adultos en A Coruña · Los7pc",
  descripcion: `Celebra tu cumpleaños (30, 40, 50…) en A Coruña con cena, show cómico y DJ hasta las 3. Con otros grupos o en exclusiva para tus invitados.`,
  ruta: RUTA,
  imagen: FOTOS.cumpleanos.src,
});

const DECADAS = [
  { t: "Celebrar 30 años", d: "La cuadrilla al completo, cena sin complicaciones y fiesta sin cambiar de local a medianoche. El plan que no exige que nadie organice «el después»." },
  { t: "Celebrar 40 años", d: "Amigos de siempre, pareja y algún compañero de trabajo. Cena tranquila, risas con el show y la pista hasta las tres, como a los veinte (o casi)." },
  { t: "Celebrar 50 años", d: "Familia y amigos de toda la vida en la misma mesa. Música para distintas generaciones y un plan que no obliga a nadie a bailar… aunque más de uno acaba en la pista." },
  { t: "Celebrar 60 o más", d: "Con hijos, nietos y amigos, por todo lo alto. Si el grupo es grande, en exclusiva y a la hora que mejor os venga, también al mediodía." },
];

export default function Cumpleanos() {
  return (
    <>
      <Migas actual="Cumpleaños" />
      <Hero
        antetitulo="Cumpleaños de adultos en A Coruña"
        titulo="Celebra tu cumpleaños en A Coruña con cena, show y baile"
        texto="Tú pones a la gente. La cena, las risas y la pista de baile ya están montadas. Sin cocinar, sin recoger y sin buscar dónde seguir la fiesta."
        foto={FOTOS.cumpleanos}
      />

      <Prosa ante="Sitios para celebrar un cumpleaños de adultos" titulo="Tu cumpleaños no se merece un «ya si eso lo celebramos»">
        <p>Organizar un cumpleaños de adultos suele acabar igual: una cadena de mensajes, un restaurante que cierra a la una y nadie que sepa a dónde ir después. Y al final, el homenajeado es el que más trabaja.</p>
        <p>Aquí funciona al revés. <strong>Tú invitas; la noche está hecha.</strong> Cena en tu mesa, una hora de show cómico para romper el hielo y DJ hasta las tres. Da igual que tus invitados no se conozcan: entre el show y la pista, a la una ya parecen amigos de toda la vida.</p>
        <p>Y si el cumpleaños es grande o lo quieres solo para los tuyos, existe la versión en exclusiva: cualquier día del año, en el {SEDE.nombre}, en otro espacio o incluso en tu casa o finca.</p>
      </Prosa>

      <Seccion arena>
        <Titulo ante="Cumpleaños redondos" titulo="30, 40, 50, 60… cada década se celebra distinto" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {DECADAS.map((x) => (
            <article key={x.t} className="tarjeta p-6">
              <h3 className="font-serif text-2xl font-semibold">{x.t}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{x.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-prosa text-tinta-suave">
          ¿Lo quieres solo para tus invitados, otro día o en otro sitio? <Link href="/eventos-privados-coruna/" className="enlace">Mira los eventos privados en exclusiva</Link>.
        </p>
      </Seccion>

      <Incluye titulo="Lo que tiene tu noche de cumpleaños" />

      <Pasos
        ante="Para quien organiza"
        titulo="Cómo organizar un cumpleaños de adultos sin estrés"
        pasos={[
          { t: "Elige fecha con margen", d: "Los sábados de temporada son los más pedidos: cuanto antes consultes, más opciones tendrás." },
          { t: "Haz la lista (aproximada)", d: "Para consultar basta con un número orientativo. Luego se ajusta." },
          { t: "Decide: con otros grupos o solo los tuyos", d: "Hasta unas 20–30 personas, la noche compartida tiene más ambiente. Si sois muchos, en exclusiva." },
          { t: "Pacta la tarta y las sorpresas", d: "Si hay tarta, vídeo o sorpresa para el homenajeado, dilo al reservar y se coordina." },
          { t: "Pregunta alergias una vez", d: "Hay opción vegetariana, vegana y adaptación a alergias si se avisa al reservar." },
          { t: "Piensa en la vuelta", d: "Se acaba a las tres: taxis, conductor o traslado para el grupo." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber"
        mejor={[
          "No cocinas, no recoges y no tienes que buscar dónde seguir.",
          "Funciona aunque tus invitados no se conozcan entre sí.",
          "Precio cerrado por persona: cada invitado sabe lo que paga.",
          "Música para distintas generaciones, de los 20 a los 70.",
        ]}
        peor={[
          "En la cena con otros grupos compartís sala: si quieres intimidad total, pide la versión en exclusiva.",
          "Las copas del baile van aparte, en la barra.",
          "La cena con otros grupos es de abril a septiembre; fuera de temporada, en exclusiva.",
        ]}
      />

      <LineaNoche />
      <Ambiente />
      <DosModalidades
        ejemploConjunta="Ideal si sois entre 6 y 25: vuestra mesa, vuestra tarta si la habéis pactado y el resto de la sala también de celebración."
        ejemploMedida="Para un cumpleaños grande o redondo: solo tus invitados, cualquier día del año, en comida o en cena. En Oza, en otro espacio o en tu casa o finca."
      />
      <Faq preguntas={FAQ_CUMPLE} titulo="Dudas típicas de un cumpleaños" />
      <PostsRelacionados slugs={["celebrar-50-cumpleanos-coruna"]} titulo="Ideas para tu cumpleaños" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="Que tu cumpleaños se recuerde por la fiesta" />
      <JsonLdMigas nombre="Cumpleaños" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_CUMPLE} />
    </>
  );
}
