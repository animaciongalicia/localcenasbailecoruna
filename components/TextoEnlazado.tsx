import Link from "next/link";

/** Convierte "[texto](/ruta/)" en enlaces internos. El resto del texto se muestra tal cual. */
export default function TextoEnlazado({ texto }: { texto: string }) {
  const partes = texto.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {partes.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return p;
        return m[2].startsWith("/") ? (
          <Link key={i} href={m[2]} className="enlace">{m[1]}</Link>
        ) : (
          <a key={i} href={m[2]} className="enlace" rel="noopener">{m[1]}</a>
        );
      })}
    </>
  );
}
