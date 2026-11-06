// Fotos de la web. Para cambiar una, sustituye el archivo en public/fotos/ con EL MISMO NOMBRE
// (horizontal, mínimo 1200 px de ancho, menos de 500 KB). Next.js la optimiza sola.
// Hay una foto por celebración: así cada página tiene su propio color.
// Solo fotos reales con permiso de las personas que salen. Nada de bancos de imágenes.

export type Foto = { src: string; alt: string };

export const FOTOS = {
  // Ambiente general
  baile: { src: "/fotos/ambiente-baile.jpg", alt: "Grupos bailando en la pista durante una cena baile de Los7pc" },
  salon: { src: "/fotos/cena-salon.jpg", alt: "Salón con mesas de grupos durante una cena baile en A Coruña" },
  grupos: { src: "/fotos/cena-grupos.jpg", alt: "Mesas de grupos cenando antes del show y el baile" },
  celebrando: { src: "/fotos/grupo-celebrando.jpg", alt: "Grupo de amigas celebrando en su mesa durante la cena" },
  // Una por celebración (sustituibles)
  navidad: { src: "/fotos/navidad.jpg", alt: "Cena de empresa de Navidad con grupos en el salón" },
  cumpleanos: { src: "/fotos/cumpleanos.jpg", alt: "Grupo celebrando un cumpleaños en su mesa" },
  empresas: { src: "/fotos/empresas.jpg", alt: "Mesas de una cena de empresa en A Coruña" },
  despedidas: { src: "/fotos/despedidas.jpg", alt: "Grupo de despedida celebrando durante la cena" },
  jubilaciones: { src: "/fotos/jubilaciones.jpg", alt: "Compañeros celebrando una jubilación en la cena" },
  privados: { src: "/fotos/eventos-privados.jpg", alt: "Fiesta privada con pista de baile llena" },
  local: { src: "/fotos/local.jpg", alt: "Salón del Club Náutico de Oza preparado para una cena baile" },
  menus: { src: "/fotos/menus.jpg", alt: "Grupos cenando el menú de la cena baile" },
} satisfies Record<string, Foto>;

export const GALERIA: Foto[] = [FOTOS.salon, FOTOS.baile, FOTOS.grupos, FOTOS.celebrando];
