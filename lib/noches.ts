import fs from "node:fs";
import path from "node:path";
import type { Foto } from "./fotos";

/** Fotos reales de las noches (public/fotos/noches/). Se leen al compilar: basta con subirlas. */
export function fotosNoches(): Foto[] {
  const dir = path.join(process.cwd(), "public", "fotos", "noches");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => ({ src: `/fotos/noches/${f}`, alt: "Grupo celebrando en una cena baile de Los7pc con show y DJ" }));
  } catch {
    return [];
  }
}
