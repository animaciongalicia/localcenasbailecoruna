import Link from "next/link";
import { Argumentos, BloqueConsulta, CtaFinal, DosModalidades, Espacio, Faq, Hero, Migas, Ocasiones } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { FAQ_EMPRESA } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/cenas-empresa-coruna/";

export const metadata = meta({
  titulo: "Cenas de empresa en A Coruña con show y baile · Los7pc",
  descripcion: `Cenas y comidas de empresa en A Coruña: cena, show cómico y DJ en el ${SEDE.nombre}. Cena conjunta o evento a medida con presupuesto personalizado.`,
  ruta: RUTA,
  imagen: FOTOS.salon.src,
});

export default function Empresas() {
  return (
    <>
      <Migas actual="Cenas de empresa" />
      <Hero
        antetitulo="Empresas · A Coruña"
        titulo="Cenas de empresa con show y baile en A Coruña"
        texto="La cena de equipo que no se queda en el postre. Cena, una hora de humor y pista de baile, con una sola persona de contacto para todo."
        foto={FOTOS.salon}
        ctaSecundario={{ href: "/reservas/?modalidad=medida", texto: "Pedir propuesta para mi empresa" }}
      />
      <Argumentos
        ante="Para quien la organiza"
        titulo="Menos gestiones, más equipo"
        texto="Si te ha tocado organizar la cena de la empresa, ya sabes lo que cuesta poner de acuerdo a todo el mundo. Aquí el plan ya viene completo."
        puntos={[
          { t: "Un único interlocutor", d: "Fecha, número de personas, menú y cambios, con la misma persona por WhatsApp o teléfono." },
          { t: "Para equipos pequeños y grandes", d: "Un departamento de 8 personas puede unirse a una cena conjunta. Una plantilla entera puede pedir su formato." },
          { t: "Plan para todos los perfiles", d: "Quien quiere cenar y charlar, cena. Quien quiere bailar, baila hasta las 3. Nadie se siente obligado." },
          { t: "Presupuesto claro", d: `Cena conjunta a ${OFERTAS.temporada.precio} € por persona, IVA incluido. A medida, presupuesto según fecha, asistentes y servicios.` },
        ]}
      />
      <DosModalidades
        ejemploConjunta="Para equipos y departamentos que quieren un plan hecho: vuestra mesa, cena con bebida, show y baile compartidos con otros grupos."
        ejemploMedida="Para cierres de temporada, aniversarios de empresa o eventos con clientes: menú sentado o catering de pie, con o sin DJ y show."
      />
      <section className="contenedor pt-10">
        <p className="tarjeta p-5 text-tinta-suave">
          ¿Buscas la cena o comida de Navidad de la empresa? Tiene sus propias fechas y precio:{" "}
          <Link href="/cenas-navidad-coruna/" className="enlace">ver cenas de Navidad {OFERTAS.navidad.anio}</Link>.
        </p>
      </section>
      <Espacio />
      <BloqueConsulta titulo="Pide propuesta para tu empresa" celebracion="empresa" modalidad="medida" />
      <Faq preguntas={FAQ_EMPRESA} titulo="Lo que suelen preguntar las empresas" />
      <Ocasiones excluir={RUTA} />
      <CtaFinal titulo="La cena de empresa que la gente sí quiere repetir" />
      <JsonLdMigas nombre="Cenas de empresa" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_EMPRESA} />
    </>
  );
}
