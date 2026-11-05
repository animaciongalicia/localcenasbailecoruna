// Fotos REALES de cenas baile de Los7pc (procedentes de la web de Navidad).
// Pendiente: confirmar cuáles son del Club Náutico de Oza. Mientras tanto, los textos
// alternativos no afirman el lugar. Las imágenes de banco (Fotolia) NO se usan.
// Para cambiar una foto: sustituye el archivo en public/fotos con el mismo nombre
// o añade una entrada aquí con sus medidas reales.

export type Foto = { src: string; alt: string; w: number; h: number };

export const FOTOS = {
  baile: { src: "/fotos/ambiente-baile.jpg", alt: "Grupos bailando en la pista durante una cena baile de Los7pc", w: 960, h: 639 },
  salon: { src: "/fotos/cena-salon.jpg", alt: "Salón con mesas de grupos durante una cena baile en A Coruña", w: 960, h: 639 },
  grupos: { src: "/fotos/cena-grupos.jpg", alt: "Mesas de grupos cenando antes del show y el baile", w: 960, h: 640 },
  celebrando: { src: "/fotos/grupo-celebrando.jpg", alt: "Grupo de amigas celebrando en su mesa durante la cena", w: 960, h: 640 },
} satisfies Record<string, Foto>;

export const GALERIA: Foto[] = [FOTOS.salon, FOTOS.baile, FOTOS.grupos, FOTOS.celebrando];
