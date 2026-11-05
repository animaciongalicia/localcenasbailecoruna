"use client";

import { EVENTO_ELEGIR_NOCHE } from "@/lib/navidad";

/** Lleva al formulario de Navidad con la noche ya elegida. Sin JS, el enlace baja igualmente al formulario. */
export default function BotonNoche({ fecha, texto = "Consultar esta noche", linea = false }: { fecha: string; texto?: string; linea?: boolean }) {
  return (
    <a
      href="#reserva-navidad"
      onClick={() => window.dispatchEvent(new CustomEvent(EVENTO_ELEGIR_NOCHE, { detail: fecha }))}
      className={`${linea ? "btn-linea" : "btn-principal"} min-h-[44px] w-full px-3 text-sm`}
    >
      {texto}
    </a>
  );
}
