import datos from "@/data/navidad.json";

// Fechas de Navidad: solo noches reales que Pablo publica en data/navidad.json.
// Sin aforos, sin plazas ni contadores: confirmada, a demanda o completa.

export type TipoNoche = "confirmada" | "a-demanda";
export type Noche = { fecha: string; etiqueta: string; tipo: TipoNoche; nota?: string; completa?: boolean };


/** Una noche desaparece al día siguiente (la página se regenera cada hora). */
const pasada = (f: Noche) => Date.now() > new Date(`${f.fecha}T23:00:00Z`).getTime();

export function getNoches(): Noche[] {
  return (datos.fechas as Noche[])
    .filter((f) => !pasada(f))
    .map((f) => ({ ...f, tipo: f.tipo === "a-demanda" ? "a-demanda" : "confirmada" }) as Noche)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export const getConfirmadas = () => getNoches().filter((f) => f.tipo === "confirmada");
export const getADemanda = () => getNoches().filter((f) => f.tipo === "a-demanda");

