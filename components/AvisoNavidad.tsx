import Link from "next/link";
import { OFERTAS } from "@/lib/sitio";

/** Franja superior durante la campaña de Navidad (OFERTAS.navidad.destacada). */
export default function AvisoNavidad() {
  if (!OFERTAS.navidad.destacada) return null;
  return (
    <div className="bg-acento text-white">
      <p className="contenedor py-2 text-center text-sm">
        Cenas y comidas de Navidad {OFERTAS.navidad.anio} en el Club Náutico de Oza.{" "}
        <Link href="/cenas-navidad-coruna/" className="font-semibold underline underline-offset-2">Ver Navidad</Link>
      </p>
    </div>
  );
}
