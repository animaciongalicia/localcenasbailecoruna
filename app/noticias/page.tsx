import Link from "next/link";
import { Migas, Seccion, Titulo } from "@/components/Bloques";
import { IconoFlecha } from "@/components/Iconos";
import { JsonLdMigas } from "@/components/JsonLd";
import BarraNoticias from "@/components/BarraNoticias";
import { fechaPost, postsOrdenados } from "@/lib/noticias";
import { meta } from "@/lib/seo";

const RUTA = "/noticias/";

export const metadata = meta({
  titulo: "Noticias y consejos para celebrar en A Coruña · Los7pc",
  descripcion: "Cenas de empresa, cumpleaños, jubilaciones y fiestas: consejos prácticos, novedades y algo de humor para organizar tu celebración en A Coruña.",
  ruta: RUTA,
});

export default function Noticias() {
  const posts = postsOrdenados();
  return (
    <>
      <Migas actual="Noticias" />
      <Seccion className="!pt-10">
        <Titulo as="h1" ante="Noticias y consejos" titulo="Para organizar sin dramas (y reírse un poco)" texto="Guías prácticas para quien organiza, novedades de la temporada y algún que otro artículo para compartir en el grupo de la oficina." />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="grid content-start gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/noticias/${p.slug}/`} className="tarjeta group flex h-full flex-col p-6 hover:border-acento">
                <span className="antetitulo">{p.categoria}</span>
                <h2 className="mt-2 font-serif text-2xl font-semibold group-hover:text-acento">{p.titulo}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-tinta-suave">{p.descripcion}</p>
                <span className="mt-5 flex items-center justify-between text-sm text-tinta-suave">
                  <time dateTime={p.fecha}>{fechaPost(p.fecha)} · {p.lectura} min</time>
                  <IconoFlecha className="h-5 w-5 text-acento" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <BarraNoticias />
        </div>
      </Seccion>
      <JsonLdMigas nombre="Noticias" ruta={RUTA} />
    </>
  );
}
