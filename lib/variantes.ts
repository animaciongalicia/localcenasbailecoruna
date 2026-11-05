// Titulares de Navidad por anuncio: /cenas-navidad-coruna/?g=empresas | amigos | instagram
// El middleware sirve cada variante como HTML estático, con canonical a la página principal.

export type Variante = "generica" | "empresas" | "amigos" | "instagram";
export const VARIANTES_URL = ["empresas", "amigos", "instagram"] as const;

type Copy = { antetitulo: string; titular: string; bajada: string };

export const COPY_NAVIDAD: Record<Variante, Copy> = {
  generica: {
    antetitulo: "Cenas de empresa de Navidad · A Coruña",
    titular: "Cena de empresa de Navidad en A Coruña, con show y baile",
    bajada: "La cena de Navidad que el equipo sí quiere: cena con bebida, una hora de show cómico y DJ hasta las 3. Todo en el Club Náutico de Oza.",
  },
  empresas: {
    antetitulo: "Cena de empresa de Navidad · A Coruña",
    titular: "La cena de empresa que nadie se va a querer saltar",
    bajada: "Cena, show y pista hasta las 3. Sin discursos del jefe. Bueno, uno corto.",
  },
  amigos: {
    antetitulo: "Navidad en cuadrilla · A Coruña",
    titular: "Tu cuadrilla merece algo más que el bar de siempre",
    bajada: "Cenáis bien, os reís con el show y cerráis la pista a las 3.",
  },
  instagram: {
    antetitulo: "Cena · Show · Pista · A Coruña",
    titular: "Cena, show y pista hasta las 3. Tú pones el outfit",
    bajada: "La noche de Navidad que vas a subir a stories. No toda, claro.",
  },
};

export function esVariante(g: string | undefined | null): g is Exclude<Variante, "generica"> {
  return !!g && (VARIANTES_URL as readonly string[]).includes(g);
}
