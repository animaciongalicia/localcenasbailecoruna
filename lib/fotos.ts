// Fotos de la web. Para cambiar una, sustituye el archivo en public/fotos/ con EL MISMO NOMBRE
// (horizontal, mínimo 1200 px de ancho, menos de 500 KB). Next.js la optimiza sola.
// Las fotos de ambiente se usan como ilustración: los textos alternativos NO dicen que sean
// del local ni de clientes concretos. En "El local" solo van fotos reales de las cenas.

export type Foto = { src: string; alt: string };

export const FOTOS = {
  // Fotos reales de cenas baile de Los7pc
  baileReal: { src: "/fotos/ambiente-baile.jpg", alt: "Grupos bailando en la pista durante una cena baile de Los7pc" },
  salon: { src: "/fotos/cena-salon.jpg", alt: "Salón con mesas de grupos durante una cena baile en A Coruña" },
  grupos: { src: "/fotos/cena-grupos.jpg", alt: "Mesas de grupos cenando antes del show y el baile" },
  celebrando: { src: "/fotos/grupo-celebrando.jpg", alt: "Grupo de amigas celebrando en su mesa durante la cena" },

  // Ambiente por celebración
  baile: { src: "/fotos/baile.jpeg", alt: "Gente bailando de noche en una fiesta con luces" },
  fiesta: { src: "/fotos/fiesta.jpg", alt: "Amigas bailando entre confeti en una celebración" },
  brindis: { src: "/fotos/celebracion-jubilacion.jpg", alt: "Copas de vino brindando en una celebración" },
  navidad: { src: "/fotos/comidas-y-cenas-de-navidad.jpeg", alt: "Mesa de cena de Navidad con copas, velas y árbol iluminado" },
  navidadMesa: { src: "/fotos/navidad.jpg", alt: "Mesa navideña con velas y árbol de Navidad" },
  navidadBrindis: { src: "/fotos/celebracion-navidad.jpeg", alt: "Brindis con cava bajo luces en una cena de Navidad" },
  cumpleanos: { src: "/fotos/fiesta.jpeg", alt: "Celebración de cumpleaños con tarta y amigas aplaudiendo" },
  cumpleanosFiesta: { src: "/fotos/cumpleanos.jpg", alt: "Grupo de amigos en una fiesta de cumpleaños bajo guirnaldas de luces" },
  cumpleanosDeco: { src: "/fotos/cumpleanos-3.jpg", alt: "Mesa de cumpleaños con globos y tarta" },
  empresas: { src: "/fotos/cena-de-empresa.jpg", alt: "Compañeros de trabajo brindando en una cena de empresa" },
  despedidas: { src: "/fotos/fiesta.jpg", alt: "Grupo de amigas celebrando una despedida entre confeti" },
  jubilaciones: { src: "/fotos/jubilacion-coruna.jpg", alt: "Compañeros celebrando una jubilación con regalo y confeti" },
  jubilacionesBengalas: { src: "/fotos/fiesta-jubilacion-idea.jpg", alt: "Grupo con bengalas celebrando una fiesta de jubilación" },
  privados: { src: "/fotos/eventos-privados.webp", alt: "Copas brindando entre confeti dorado en una fiesta privada" },
  menus: { src: "/fotos/local.jpg", alt: "Grupo cenando en una mesa larga con vino y platos para compartir" },
  canapes: { src: "/fotos/catering-3.jpg", alt: "Camarero sirviendo una bandeja de canapés" },
  buffet: { src: "/fotos/catering.jpg", alt: "Mesa de catering de pie con embutidos, panes y quesos" },
  // El local: fotos reales
  local: { src: "/fotos/cena-salon.jpg", alt: "Salón con mesas de grupos durante una cena baile de Los7pc" },
} satisfies Record<string, Foto>;

/** Galería de "El local": solo fotos reales. */
export const GALERIA: Foto[] = [FOTOS.salon, FOTOS.baileReal, FOTOS.grupos, FOTOS.celebrando];

/** Mosaico de ambiente: mezcla de fotos reales y de ambiente. */
export const MOSAICO: Foto[] = [FOTOS.fiesta, FOTOS.navidadBrindis, FOTOS.baileReal, FOTOS.jubilacionesBengalas];
