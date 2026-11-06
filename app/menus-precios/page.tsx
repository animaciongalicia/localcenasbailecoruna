import Link from "next/link";
import { BandaFotos, CtaFinal, Faq, Hero, ListaMenu, Migas, Seccion, Titulo } from "@/components/Bloques";
import { JsonLdFaq, JsonLdMigas, JsonLdServicio } from "@/components/JsonLd";
import { FAQ_PRECIOS } from "@/lib/faq";
import { FOTOS } from "@/lib/fotos";
import { meta } from "@/lib/seo";
import { MENU, OFERTAS, SEDE } from "@/lib/sitio";

const RUTA = "/menus-precios/";
const T = OFERTAS.temporada;
const N = OFERTAS.navidad;

export const metadata = meta({
  titulo: `Menú y precio de la cena baile ${T.anio} en A Coruña · Los7pc`,
  descripcion: `Menú y precio de la cena baile en A Coruña: empanada, croquetas, langostinos, carne asada, postre y bebida en la cena. Show y DJ hasta las 3.`,
  ruta: RUTA,
  imagen: FOTOS.menus.src,
});

export default function MenusPrecios() {
  return (
    <>
      <Migas actual="Menús" />
      <Hero
        antetitulo={`Temporada ${T.temporada} ${T.anio}`}
        titulo="Menú y precio de la cena baile"
        texto="Lo que se cena, lo que se bebe y lo que cuesta. Sin letra pequeña: lo que no está incluido también lo verás aquí."
        foto={FOTOS.menus}
        ctaSecundario={null}
      />
      <Seccion>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <article className="tarjeta p-6 sm:p-8">
            <p className="antetitulo">Cena baile conjunta · {T.temporadaCorta} {T.anio}</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Menú</h2>
            <div className="mt-6"><ListaMenu /></div>
          </article>
          <aside className="space-y-5">
            <div className="oscuro rounded-2xl bg-noche p-6 text-marfil sm:p-8">
              <p className="antetitulo">Precio por persona</p>
              <p className="mt-2 font-serif text-6xl font-semibold text-oro">{T.precio} €</p>
              <p className="mt-1 text-marfil/80">IVA incluido</p>
              <h3 className="mt-6 font-semibold">Incluye</h3>
              <ul className="lista-check mt-3 space-y-2 text-marfil/85">
                {T.incluye.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <h3 className="mt-6 font-semibold">No incluye</h3>
              <ul className="mt-2 space-y-1 text-marfil/75">
                {T.noIncluye.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <Link href="/reservas/?modalidad=conjunta" className="btn-principal mt-7 w-full">Consultar disponibilidad</Link>
            </div>
            <p className="text-sm leading-relaxed text-tinta-suave">{MENU.dietas}</p>
          </aside>
        </div>
      </Seccion>

      <Seccion arena>
        <Titulo ante="Otras opciones" titulo="Precios que van por separado" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="tarjeta p-6">
            <h3 className="font-serif text-2xl font-semibold">Evento en exclusiva</h3>
            <p className="mt-2 leading-relaxed text-tinta-suave">
              Solo para tu grupo, cualquier día del año, en comida o en cena: en Oza, en otro espacio o en tu local. Menú sentado o catering de pie, con DJ y show propios. <strong className="text-tinta">Presupuesto personalizado</strong> según fecha, asistentes y lugar.
            </p>
            <Link href="/eventos-privados-coruna/" className="enlace mt-4 inline-block">Ver eventos privados</Link>
          </article>
          <article className="tarjeta p-6">
            <h3 className="font-serif text-2xl font-semibold">Cenas de Navidad {N.anio}</h3>
            <p className="mt-2 font-serif text-4xl font-semibold text-acento">{N.precio} € <span className="font-sans text-base font-medium text-tinta-suave">por persona</span></p>
            <ul className="mt-4 space-y-2 leading-relaxed text-tinta-suave">
              <li><strong className="text-tinta">Señal:</strong> {N.senal} € por persona para confirmar la mesa, por transferencia o en persona. No se devuelve.</li>
              <li><strong className="text-tinta">Resto:</strong> {N.precio - N.senal} € por persona, el día del evento, a poder ser en efectivo.</li>
              <li><strong className="text-tinta">Bajas:</strong> avisando con {N.horasCancelacion} h o más, esa persona no paga el resto; con menos, se paga la cena completa.</li>
            </ul>
            <Link href="/cenas-navidad-coruna/" className="enlace mt-4 inline-block">Ver cenas de empresa de Navidad</Link>
          </article>
        </div>
      </Seccion>

      <Seccion>
        <Titulo
          ante="Antes de pagar"
          titulo="Cómo se confirma una reserva"
          texto="Consultar no compromete a nada. Cuando haya fecha para tu grupo, recibirás por escrito las condiciones de confirmación, pago y cambios antes de abonar nada. La reserva queda confirmada con ese pago."
        />
      </Seccion>

      <BandaFotos fotos={[FOTOS.navidadMesa, FOTOS.canapes, FOTOS.buffet]} />
      <Faq preguntas={FAQ_PRECIOS} titulo="Dudas sobre el precio" />
      <CtaFinal />
      <JsonLdMigas nombre="Menús" ruta={RUTA} />
      <JsonLdServicio />
      <JsonLdFaq preguntas={FAQ_PRECIOS} />
    </>
  );
}
