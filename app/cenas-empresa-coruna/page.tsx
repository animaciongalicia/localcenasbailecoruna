import Link from "next/link";
import { Ambiente, CtaFinal, DosModalidades, Espacio, Faq, Hero, Incluye, Migas, Ocasiones, Seccion } from "@/components/Bloques";
import { Casos, MejorPeor, Pasos, PostsRelacionados, Prosa } from "@/components/Contenido";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_EMPRESA } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cenas-empresa-coruna/";

export const metadata = meta({
  titulo: "Cenas y comidas de empresa en A Coruña con show y baile · Los7pc",
  descripcion: `Cenas y comidas de empresa en A Coruña: cena, show cómico y DJ en el ${SEDE.nombre}, o en exclusiva en vuestras instalaciones. Para equipos de 6 a toda la plantilla.`,
  ruta: RUTA,
  imagen: FOTOS.salon.src,
});

export default function Empresas() {
  return (
    <>
      <Migas actual="Cenas de empresa" />
      <Hero
        antetitulo="Empresas · A Coruña"
        titulo="Cenas y comidas de empresa con show y baile en A Coruña"
        texto="La cena de equipo que no se queda en el postre. Cena, una hora de humor y pista de baile, con una sola persona de contacto para todo."
        foto={FOTOS.salon}
        ctaSecundario={{ href: "/reservas/?modalidad=medida&celebracion=empresa", texto: "Pedir propuesta para mi empresa" }}
      />

      <Prosa ante="Para quien organiza en la empresa" titulo="Organizar la cena de empresa no debería ser otro proyecto">
        <p>Si te ha tocado organizar la cena del equipo, ya sabes lo que viene: encuestas de fechas, menús que no convencen a nadie y la eterna pregunta de las doce y media: «¿y ahora a dónde vamos?».</p>
        <p><strong>Aquí el plan viene completo.</strong> Cena con bebida, una hora de show cómico que rompe el hielo entre departamentos y DJ hasta las tres. Quien quiere cenar y charlar, cena. Quien quiere bailar, baila. Y nadie tiene que montar el después.</p>
        <p>Para equipos pequeños, la cena con otros grupos da un ambiente que una mesa de ocho no consigue sola. Para la plantilla entera, la opción en exclusiva: <strong>cualquier día del año, en comida o en cena, en el {SEDE.nombre}, en otro espacio o en vuestras instalaciones.</strong></p>
      </Prosa>

      <Incluye titulo="Qué tiene la noche de tu equipo" />

      <Casos
        ante="Formatos para empresas"
        titulo="Del departamento a la plantilla entera"
        casos={[
          { etiqueta: "6 – 15 personas", t: "Equipo pequeño", d: "Vuestra mesa en la cena baile con otros grupos. Ambiente de fiesta grande sin tener que ser muchos." },
          { etiqueta: "15 – 40 personas", t: "Departamento o empresa mediana", d: "Varias mesas juntas, show para romper el hielo y pista para cerrar la temporada." },
          { etiqueta: "40 o más", t: "Toda la plantilla", d: "En exclusiva: sala para vosotros, en Oza, en otro espacio o en vuestras instalaciones." },
          { etiqueta: "Mediodía", t: "Comida de empresa", d: "Para equipos con turnos o familias: comida con DJ y fiesta, en exclusiva." },
          { etiqueta: "Fin de temporada", t: "Cierre de verano o de proyecto", d: "La excusa perfecta para juntar al equipo antes de vacaciones, de abril a septiembre." },
          { etiqueta: "Con clientes", t: "Evento de agradecimiento", d: "Cena o comida con humor y música para clientes y proveedores, a medida." },
        ]}
      />

      <Pasos
        ante="Paso a paso"
        titulo="Cómo organizar una cena de empresa que la gente quiera repetir"
        pasos={[
          { t: "Fecha: propón dos, no diez", d: "Un viernes y una alternativa. Las encuestas abiertas solo generan debate." },
          { t: "Número aproximado", d: "Con «somos unos 20» ya se puede consultar. El número final se cierra después." },
          { t: "Formato", d: "Con otros grupos si sois pocos; en exclusiva si sois muchos o queréis vuestro propio espacio." },
          { t: "Quién paga qué", d: "Precio cerrado por persona con cena y bebida. Copas del baile, aparte. Si invita la empresa, prepara los datos fiscales." },
          { t: "Alergias y dietas", d: "Una sola pregunta, por escrito, al principio." },
          { t: "La vuelta", d: "Si la noche acaba a las tres, deja resueltos taxis o traslado." },
        ]}
      />

      <MejorPeor
        titulo="Lo mejor y lo que debes saber"
        mejor={[
          "Un único interlocutor: fecha, número, menú y cambios con la misma persona.",
          "Plan para todos los perfiles: cena, humor y baile para quien se anime.",
          "El show conecta a gente que en la oficina apenas se cruza.",
          "Posibilidad de hacerlo en vuestras instalaciones, todo el año.",
        ]}
        peor={[
          "La cena con otros grupos es de abril a septiembre; el resto del año, en exclusiva (y en Navidad, en sus fechas).",
          "Las copas del baile no están incluidas.",
          "Si buscáis una cena de trabajo con presentaciones y silencio, este no es el formato.",
        ]}
      />

      <section className="contenedor pb-4 pt-10">
        <p className="tarjeta p-5 text-tinta-suave">
          ¿Buscas la <strong className="text-tinta">cena o comida de empresa de Navidad</strong>? Tiene sus propias fechas y una guía para organizarla:{" "}
          <Link href="/cenas-navidad-coruna/" className="enlace">cenas de empresa de Navidad {OFERTAS.navidad.anio}</Link>.
        </p>
      </section>

      <Ambiente />
      <DosModalidades
        ejemploConjunta="Para equipos y departamentos que quieren un plan hecho: vuestra mesa, cena con bebida, show y baile compartidos con otros grupos."
        ejemploMedida="Para la plantilla entera, cierres de temporada o eventos con clientes, cualquier día del año: en Oza, en otro espacio o en vuestras instalaciones."
      />
      <Espacio />
      <Faq preguntas={FAQ_EMPRESA} titulo="Lo que suelen preguntar las empresas" />
      <PostsRelacionados slugs={["organizar-cena-empresa-navidad-coruna", "personajes-cena-empresa-navidad"]} />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="La cena de empresa que la gente sí quiere repetir" />
      <JsonLdMigas nombre="Cenas de empresa" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_EMPRESA} />
    </>
  );
}
