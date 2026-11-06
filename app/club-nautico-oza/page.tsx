import { GaleriaNoches, CtaFinal, Faq, Galeria, Hero, Migas, Seccion, Titulo, Trayectoria } from "@/components/Bloques";
import { IconoUbicacion } from "@/components/Iconos";
import { JsonLdFaq, JsonLdMigas } from "@/components/JsonLd";
import { Pasos, Prosa } from "@/components/Contenido";
import { FAQ_ESPACIO } from "@/lib/faq";
import { FOTOS, GALERIA } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { SEDE } from "@/lib/sitio";

const RUTA = "/club-nautico-oza/";

export const metadata = meta({
  titulo: `Cenas baile en el ${SEDE.nombre}, A Coruña · Los7pc`,
  descripcion: `Dónde se celebran las cenas baile de Los7pc: ${SEDE.nombre}, ${SEDE.direccion}, A Coruña. Aparcamiento, cómo llegar y quién organiza la noche.`,
  ruta: RUTA,
  imagen: FOTOS.local.src,
});

export default function Espacio() {
  return (
    <>
      <Migas actual="El local" />
      <Hero
        antetitulo="El local"
        titulo={`Cenas baile en el ${SEDE.nombre}`}
        texto={`Junto a la playa de Oza, en A Coruña. ${SEDE.desde}, aquí se celebran las cenas con show y baile de Los7pc.`}
        foto={FOTOS.local}
        ctaSecundario={{ href: SEDE.mapsUrl, texto: "Cómo llegar" }}
      />
      <Prosa ante="Dónde se celebran las cenas baile" titulo={`El ${SEDE.nombre}, junto a la playa de Oza`}>
        <p>Las cenas baile de Los7pc se celebran en el {SEDE.nombre}, junto a la playa de Oza, en A Coruña. Un local <strong>amplio y cómodo: unas {SEDE.sentados} personas sentadas y cerca de {SEDE.dePie} en catering de pie</strong>, con pista de baile, terraza de fumadores con vistas a los pantalanes de los barcos y, en verano, terraza para el aperitivo.</p>
        <p>Está dentro de la ciudad, pero <strong>apartado de las viviendas</strong>: la fiesta puede alargarse sin molestar a los vecinos. Por eso aquí se puede hacer algo que muy pocos locales permiten: <strong>traer un grupo de música en directo</strong>. Y con aparcamiento en el propio club.</p>
        <p>Antes, durante más de diez años, las cenas baile pasaron por hoteles y salas de la ciudad. Desde hace dos temporadas, Oza es la casa. <strong>Los7pc organiza la noche</strong> (cena, show, DJ y atención a los grupos) en las instalaciones del club.</p>
        <p>¿Preferís otro sitio? Los eventos en exclusiva se pueden hacer también en otros espacios o en vuestro propio local.</p>
      </Prosa>

      <Seccion arena>
        <Titulo ante="El local en seis claves" titulo="Por qué el Club Náutico de Oza funciona tan bien para celebrar" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SEDE.caracteristicas.map((c) => (
            <li key={c.t} className="tarjeta p-6">
              <h3 className="font-serif text-2xl font-semibold">{c.t}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{c.d}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Pasos
        ante="Antes de venir"
        titulo="Lo práctico, en cuatro puntos"
        pasos={[
          { t: "Llegada", d: "Los grupos llegan entre las 22:00 y las 22:30. Cada grupo tiene su mesa." },
          { t: "Aparcamiento", d: SEDE.aparcamiento },
          { t: "Accesibilidad", d: "Si alguien del grupo tiene movilidad reducida, coméntalo al reservar y te informo." },
          { t: "Vuelta a casa", d: "La noche acaba entre las 2:30 y las 3:00: dejad pensado el regreso." },
        ]}
      />

      <Seccion>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Titulo ante="Datos prácticos" titulo="Cómo llegar" />
            <ul className="mt-6 space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <IconoUbicacion className="mt-1 h-6 w-6 shrink-0 text-acento" />
                <span>{SEDE.nombre}<br /><span className="text-tinta-suave">{SEDE.direccion}, {SEDE.ciudad}</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-acento text-sm font-bold text-white">P</span>
                <span>{SEDE.aparcamiento}</span>
              </li>
            </ul>
            <a href={SEDE.mapsUrl} className="btn-linea mt-7" target="_blank" rel="noopener">Abrir en Google Maps</a>
            <p className="mt-6 text-sm leading-relaxed text-tinta-suave">
              Las cenas baile las organiza Los7pc en las instalaciones del club. Si necesitas información de accesibilidad para alguien del grupo, coméntalo en la consulta.
            </p>
          </div>
          <Galeria fotos={GALERIA} />
        </div>
      </Seccion>
      <GaleriaNoches titulo="Noches reales en las cenas baile" />
      <Trayectoria />
      <Faq preguntas={FAQ_ESPACIO} titulo="Dudas sobre el lugar" />
      <CtaFinal />
      <JsonLdMigas nombre="El local" ruta={RUTA} />
      <JsonLdFaq preguntas={FAQ_ESPACIO} />
    </>
  );
}
