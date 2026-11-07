import Link from "next/link";
import { getPost } from "@/lib/noticias";

/** Convierte "[texto](/ruta/)" en enlaces internos y "**texto**" en negrita. El resto del texto se muestra tal cual. */
export default function TextoEnlazado({ texto }: { texto: string }) {
  const partes = texto.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((p, i) => {
        const b = p.match(/^\*\*([^*]+)\*\*$/);
        if (b) return <strong key={i}>{b[1]}</strong>;
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return p;
        // Enlace a un artículo programado que aún no se ha publicado: texto normal, sin 404.
        const art = m[2].match(/^\/noticias\/([^/]+)\/?$/);
        if (art && !getPost(art[1])) return m[1];
        return m[2].startsWith("/") ? (
          <Link key={i} href={m[2]} className="enlace">{m[1]}</Link>
        ) : (
          <a key={i} href={m[2]} className="enlace" rel="noopener">{m[1]}</a>
        );
      })}
    </>
  );
}
