import Image from "next/image";
import Link from "next/link";
import { BandaFotos, CtaFinal, Faq, Hero, ListaMenu, Migas, Seccion, Titulo } from "@/components/Bloques";
import { IconoWhatsapp } from "@/components/Iconos";
import { JsonLdFaq, JsonLdMigas, JsonLdServicio } from "@/components/JsonLd";
import { FAQ_PRECIOS } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { getConfirmadas } from "@/lib/navidad";
import { meta } from "@/lib/seo";
import { MENU, OFERTAS, SEDE } from "@/lib/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

const RUTA = "/menus-precios/";
const T = OFERTAS.temporada;
const N = OFERTAS.navidad;

export const metadata = meta({
  titulo: `Menús y precios: Navidad ${N.anio} y cenas baile · Los7pc`,
  descripcion: `Menú y precio de las cenas de Navidad ${N.anio} en A Coruña, opciones de catering de pie y menús a medida, y la cena baile de la temporada ${T.anio}.`,
  ruta: RUTA,
  imagen: FOTOS.navidad.src,
});

const OPCIONES = [
  { foto: FOTOS.buffet, t: "Catering de pie", d: `Picoteo variado para moverse, charlar y bailar. En el ${SEDE.nombre} caben cerca de ${SEDE.dePie} personas en este formato.` },
  { foto: FOTOS.menus, t: "Menú sentado a medida", d: "Otros platos, más o menos pases, menú de mar o de carne: se adapta a vuestro grupo y presupuesto." },
  { foto: FOTOS.canapes, t: "Comidas al mediodía", d: "Comida de empresa o familiar con DJ y fiesta por la tarde, para equipos con turnos o con niños." },
  { foto: FOTOS.privados, t: "En vuestro local", d: "Llevamos la comida o cena, el DJ y el show a vuestra empresa, restaurante o finca." },
];

function Pildoras() {
  const noches = getConfirmadas();
  if (!noches.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {noches.map((f) => {
        const [dia, num, , mes] = f.etiqueta.split(" ");
        return (
          <li key={f.fecha} className={`flex items-baseline gap-1.5 rounded-full border border-white/20 px-3 py-1.5 ${f.completa ? "line-through opacity-50" : ""}`}>
            <span className="text-[11px] font-semibold uppercase text-marfil/60">{dia.slice(0, 3)}</span>
            <span className="font-serif text-lg font-semibold text-oro">{num}</span>
            <span className="text-xs text-marfil/70">{mes.slice(0, 3)}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function MenusPrecios() {
  return (
    <>
      <Migas actual="Menús" />
      <Hero
        antetitulo={`Menús · Navidad ${N.anio} y temporada ${T.anio}`}
        titulo="Menús para cenas de Navidad, empresas y celebraciones en A Coruña"
        texto="Lo que se cena, lo que se bebe y lo que cuesta. Primero, la campaña de Navidad que está en marcha; después, las opciones a medida y la cena baile de la próxima temporada."
        foto={FOTOS.navidad}
        ctaPrincipal={{ href: "#navidad", texto: `Menú de Navidad ${N.anio}` }}
        ctaSecundario={{ href: "#opciones", texto: "Catering y otras opciones" }}
      />

      <nav aria-label="Secciones de la página" className="sticky top-[68px] z-30 border-b border-linea bg-marfil/95 backdrop-blur">
        <ul className="contenedor flex gap-2 overflow-x-auto py-3 text-sm font-semibold">
          <li><a href="#navidad" className="inline-block whitespace-nowrap rounded-full bg-acento px-4 py-2 text-white">Navidad {N.anio}</a></li>
          <li><a href="#opciones" className="inline-block whitespace-nowrap rounded-full border border-linea bg-white px-4 py-2 hover:border-acento">Catering y a medida</a></li>
          <li><a href="#temporada" className="inline-block whitespace-nowrap rounded-full border border-linea bg-white px-4 py-2 hover:border-acento">Cena baile {T.anio}</a></li>
        </ul>
      </nav>

      {/* 1 · NAVIDAD: la campaña activa, lo primero y lo más visible */}
      <section id="navidad" className="oscuro relative overflow-hidden bg-noche py-14 text-marfil sm:py-20">
        <div className="contenedor">
          <div className="max-w-2xl">
            <p className="antetitulo">Campaña en marcha · {N.temporada}</p>
            <h2 className="titulo-seccion mt-3">Cenas de empresa de Navidad {N.anio}</h2>
            <p className="entradilla">Cena con bebida, una hora de show cómico y DJ hasta las 3 en el {SEDE.nombre}. Para equipos pequeños y grandes, compartiendo la noche con otros grupos.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <article className="rounded-3xl bg-marfil p-6 text-tinta sm:p-8">
              <p className="antetitulo">Menú de Navidad</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">Cocina gallega para celebrar</h3>
              <div className="mt-6"><ListaMenu /></div>
            </article>

            <aside className="flex flex-col rounded-3xl border border-oro/40 bg-noche-800 p-6 sm:p-8">
              <p className="antetitulo">Precio por persona</p>
              <p className="mt-2 font-serif text-7xl font-semibold leading-none text-oro">{N.precio} €</p>
              <ul className="lista-check mt-6 space-y-2 text-marfil/85">
                <li>Cena sentada completa</li>
                <li>Bebida durante la cena</li>
                <li>Show cómico</li>
                <li>DJ y baile hasta las 3</li>
              </ul>
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm leading-relaxed text-marfil/75">
                <p><strong className="text-marfil">Señal:</strong> {N.senal} € por persona para confirmar la mesa (no se devuelve).</p>
                <p><strong className="text-marfil">Resto:</strong> {N.precio - N.senal} € por persona, el día del evento.</p>
                <p><strong className="text-marfil">Bajas:</strong> avisando con {N.horasCancelacion} h o más, no se paga el resto.</p>
                <p><strong className="text-marfil">Copas del baile:</strong> aparte, en la barra.</p>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-marfil">Noches abiertas</p>
                <Pildoras />
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <Link href="/reservas/?celebracion=navidad" className="btn-principal">Reservar cena de Navidad</Link>
                <a href={whatsappUrl(`Hola, quiero consultar una cena de Navidad ${N.anio}.\nNoche: \nPersonas: `)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="menus-navidad" data-campana={N.id}><IconoWhatsapp /> WhatsApp</a>
              </div>
            </aside>
          </div>
          <p className="mt-6 text-sm text-marfil/60">{MENU.dietas} <Link href="/cenas-navidad-coruna/" className="enlace">Ver todo sobre las cenas de Navidad</Link>.</p>
        </div>
      </section>

      {/* 2 · OTRAS OPCIONES: previa consulta */}
      <Seccion id="opciones" arena>
        <div className="max-w-2xl">
          <Titulo ante="Previa consulta · todo el año" titulo="Catering de pie en A Coruña, menús a medida y otras opciones" texto="Si buscáis otro formato, se prepara a vuestra medida. Cuéntame la idea, la fecha y cuántos sois, y te paso propuesta y presupuesto cerrado por escrito." />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OPCIONES.map((o) => (
            <li key={o.t} className="flex flex-col overflow-hidden rounded-2xl border border-linea bg-white">
              <span className="relative block aspect-[4/3] bg-arena">
                <Image src={o.foto.src} alt={o.foto.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-serif text-xl font-semibold">{o.t}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-tinta-suave">{o.d}</span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-acento">Presupuesto a medida</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/reservas/?modalidad=medida" className="btn-principal">Pedir propuesta</Link>
          <Link href="/eventos-privados-coruna/" className="btn-linea">Ver eventos en exclusiva</Link>
        </div>
      </Seccion>

      {/* 3 · TEMPORADA 2027: más abajo, mientras dura Navidad */}
      <Seccion id="temporada">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Titulo ante={`Próxima temporada · ${T.temporada} ${T.anio}`} titulo="Cena baile con otros grupos" texto="Cumpleaños, despedidas, empresas y cuadrillas compartiendo noche: cada grupo con su mesa, el mismo menú gallego, show cómico y baile hasta las 3." />
            <p className="mt-4 text-tinta-suave">Las noches se abren según las reservas de los grupos. Si ya tenéis fecha para la primavera o el verano, podéis consultarla desde hoy.</p>
          </div>
          <div className="tarjeta grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <div>
              <p className="font-serif text-6xl font-semibold leading-none text-acento">{T.precio} €</p>
              <p className="mt-2 text-sm text-tinta-suave">por persona · IVA incluido</p>
            </div>
            <div>
              <ul className="lista-check space-y-2">{T.incluye.map((i) => <li key={i}>{i}</li>)}</ul>
              <p className="mt-3 text-sm text-tinta-suave">No incluye: {T.noIncluye.join(", ").toLowerCase()}.</p>
              <Link href="/reservas/?modalidad=conjunta" className="btn-linea mt-5">Consultar fecha {T.anio}</Link>
            </div>
          </div>
        </div>
      </Seccion>

      <Seccion arena>
        <Titulo
          ante="Antes de pagar"
          titulo="Cómo se confirma una reserva"
          texto="Consultar no compromete a nada. Cuando haya fecha para tu grupo, recibirás por escrito las condiciones de confirmación, pago y cambios antes de abonar nada. La reserva queda confirmada con ese pago."
        />
      </Seccion>

      <BandaFotos fotos={[FOTOS.navidadMesa, FOTOS.canapes, FOTOS.buffet]} />
      <Faq preguntas={FAQ_PRECIOS} titulo="Dudas sobre menús y precios" />
      <CtaFinal titulo="¿Cerramos tu menú?" texto="Dime qué celebráis, la fecha y cuántos sois. Te respondo con disponibilidad y la opción que mejor encaja." />
      <JsonLdMigas nombre="Menús" ruta={RUTA} />
      <JsonLdServicio />
      <JsonLdFaq preguntas={FAQ_PRECIOS} />
    </>
  );
}
