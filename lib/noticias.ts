// Noticias y novedades. Cada artículo es un objeto: añade uno nuevo copiando otro.
// Bloques: p (párrafo), h2 (subtítulo), lista (viñetas), cita (frase destacada), cta (llamada a la acción).
// Enlaces dentro del texto: [texto del enlace](/ruta/). Úsalos para enlazar a las páginas de venta.
// PUBLICACIÓN PROGRAMADA: un artículo con fecha futura no aparece hasta ese día (la web se regenera cada hora).
// Reglas: nada de clientes, reseñas ni anécdotas inventadas; precios solo en /menus-precios/.
// Antes de publicar uno nuevo, revisa que no compita con la palabra clave principal de una página de venta.
import { FOTOS, type Foto } from "./fotos";
import { POSTS_NAVIDAD } from "./posts-navidad";

export type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "cita"; texto: string }
  | { tipo: "cta"; texto: string; href: string; boton: string };

export type Post = {
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: "Empresas" | "Cumpleaños" | "Humor" | "Jubilaciones" | "Novedades";
  fecha: string; // yyyy-mm-dd
  lectura: number; // minutos
  foto?: Foto;
  bloques: Bloque[];
};

export const POSTS: Post[] = [
  ...POSTS_NAVIDAD,
  {
    slug: "organizar-cena-empresa-navidad-coruna",
    titulo: "Cómo organizar la cena de empresa de Navidad (y no morir en el intento)",
    descripcion: "La guía para la persona a la que le ha tocado: fechas, presupuesto, quién viene, quién paga y cómo conseguir que la gente no se vaya a la una.",
    categoria: "Empresas",
    fecha: "2026-11-06",
    lectura: 6,
    foto: FOTOS.empresas,
    bloques: [
      { tipo: "p", texto: "Te ha tocado. Nadie te preguntó, pero en la última reunión alguien dijo «¿y la cena de Navidad?» y todas las miradas fueron hacia ti. Bienvenido al club. Esto es lo que necesitas saber para que la cena salga bien, la gente se lo pase en grande y a ti no te cueste tres semanas de mensajes." },
      { tipo: "h2", texto: "1. La fecha: decide antes de preguntar" },
      { tipo: "p", texto: "El error más común es abrir una encuesta con diez fechas. Vas a recibir diez opiniones y ninguna decisión. Haz al revés: elige dos opciones razonables (un viernes y otra noche alternativa) y pregunta solo eso. Diciembre es el mes con más demanda de todo el año, así que cuanto antes lo cierres, más opciones tendrás." },
      { tipo: "lista", items: ["Viernes: el clásico. Nadie trabaja al día siguiente (o casi nadie).", "Vísperas de festivo y puentes: funcionan muy bien para grupos que quieren alargar.", "Comida en vez de cena: si hay mucha gente con niños o turnos, plantéala. También existe."] },
      { tipo: "h2", texto: "2. Cuántos sois (aproximadamente)" },
      { tipo: "p", texto: "No necesitas la cifra exacta para reservar, pero sí un número realista. Cuenta con que alguien se apunta a última hora y alguien se cae. Para consultar disponibilidad basta con un «somos unos 20»." },
      { tipo: "h2", texto: "3. El formato: con otros grupos o solo vosotros" },
      { tipo: "p", texto: "Una [cena de empresa de Navidad](/cenas-navidad-coruna/) compartida con otros grupos tiene una ventaja enorme: el ambiente ya viene hecho. No dependes de que tu equipo se anime: la sala se anima sola. Si sois muchos o queréis algo solo para la empresa, la opción es un [evento en exclusiva](/eventos-privados-coruna/), en el sitio y el día que elijáis." },
      { tipo: "h2", texto: "4. El dinero: quién paga qué" },
      { tipo: "p", texto: "Aclara esto el primer día y te ahorrarás disgustos. Lo más cómodo es un [precio cerrado por persona](/menus-precios/) que incluya cena y bebida durante la cena, y dejar claro que las copas de después van aparte. Si la empresa invita, pide factura con los datos fiscales desde el principio." },
      { tipo: "h2", texto: "5. Alergias, dietas y el compañero que «no come de nada»" },
      { tipo: "p", texto: "Pregunta una sola vez, por escrito, y pásalo junto a la reserva. Hoy es normal tener opción vegetariana, vegana o sin gluten si se avisa con tiempo. Lo que no funciona es descubrirlo con el plato delante." },
      { tipo: "h2", texto: "6. Que la gente no se vaya a la una" },
      { tipo: "p", texto: "El gran drama de las cenas de empresa: termina el postre, el restaurante empieza a recoger y el grupo se divide en tres bares distintos. Si la cena, el espectáculo y el baile están en el mismo sitio, ese problema desaparece. Nadie tiene que decidir «a dónde vamos ahora»." },
      { tipo: "cita", texto: "Una buena cena de empresa no se mide por el menú. Se mide por las fotos del lunes." },
      { tipo: "h2", texto: "7. La vuelta a casa" },
      { tipo: "p", texto: "Si la noche acaba a las tres, organiza la vuelta antes: taxis compartidos, un coche que no bebe o un traslado de grupo. Es la parte menos glamurosa y la más importante." },
      { tipo: "h2", texto: "Checklist rápido" },
      { tipo: "lista", items: ["Dos fechas propuestas, no diez.", "Número aproximado de personas.", "Formato: con otros grupos o en exclusiva.", "Presupuesto por persona y quién paga.", "Alergias y dietas, por escrito.", "Cómo se vuelve a casa.", "Reserva confirmada por escrito antes de pagar nada."] },
      { tipo: "cta", texto: "¿Quieres quitarte el marrón de encima? Cuéntanos la fecha y cuántos sois.", href: "/cenas-navidad-coruna/", boton: "Ver cenas de empresa de Navidad" },
    ],
  },
  {
    slug: "personajes-cena-empresa-navidad",
    titulo: "Los 9 personajes que aparecen en toda cena de empresa de Navidad",
    descripcion: "El que no iba a venir, el del discurso, la que organiza… Seguro que reconoces a más de uno. Y puede que a ti mismo.",
    categoria: "Humor",
    fecha: "2026-11-06",
    lectura: 4,
    foto: FOTOS.fiesta,
    bloques: [
      { tipo: "p", texto: "Da igual que trabajes en una gestoría, en un taller o en una multinacional. Cuando llega diciembre y se celebra la cena de empresa, aparecen los mismos personajes. Siempre. Aquí van, para que los reconozcas (y para que te reconozcas)." },
      { tipo: "h2", texto: "1. El que «no iba a venir»" },
      { tipo: "p", texto: "Lleva tres semanas diciendo que no puede. Aparece el primero, se queda el último y a las dos y media está pidiendo «la última» al DJ." },
      { tipo: "h2", texto: "2. La que lo ha organizado todo" },
      { tipo: "p", texto: "Ha gestionado cuarenta mensajes, tres cambios de número y dos alergias de última hora. Se merece un aplauso, una copa y que nadie le pregunte «¿y a qué hora acaba esto?»." },
      { tipo: "h2", texto: "3. El jefe con discurso" },
      { tipo: "p", texto: "Prometió que serían «dos palabritas». Fueron once minutos. Consejo para jefes: el mejor discurso de Navidad dura menos que un anuncio de turrones." },
      { tipo: "h2", texto: "4. El fichaje nuevo" },
      { tipo: "p", texto: "Lleva dos meses en la empresa y no sabe si puede reírse de las bromas internas. Al final de la noche ya tiene apodo." },
      { tipo: "h2", texto: "5. El que se sabe todas las canciones" },
      { tipo: "p", texto: "Da igual que suene un clásico de los 80 o el éxito del verano. Él se lo sabe. Entero. Y lo canta." },
      { tipo: "h2", texto: "6. La foto-reportera" },
      { tipo: "p", texto: "Tiene 340 fotos antes del postre. El lunes las comparte en el grupo y alguien pide borrar seis." },
      { tipo: "h2", texto: "7. El que no baila" },
      { tipo: "p", texto: "«Yo no bailo». Lo dice a las doce. A la una y media está en el centro de la pista. Nadie sabe qué pasó entre medias." },
      { tipo: "h2", texto: "8. El que pide la cuenta a la una" },
      { tipo: "p", texto: "En los restaurantes de siempre es el que divide el grupo. Cuando la [cena, el show y el baile](/) están en el mismo sitio, simplemente se queda sin argumento." },
      { tipo: "h2", texto: "9. El que lo cuenta todo el lunes" },
      { tipo: "p", texto: "Tiene un resumen detallado de la noche. Con nombres. Por eso existe la regla de oro: lo que pasa en la cena de empresa, se queda en la cena de empresa." },
      { tipo: "cita", texto: "¿Cuál eres tú? Si no encuentras ninguno… probablemente eres el número 2." },
      { tipo: "cta", texto: "Pon a todos estos personajes en la misma sala, con cena, show y DJ hasta las tres.", href: "/cenas-navidad-coruna/", boton: "Cenas de empresa de Navidad" },
    ],
  },
  {
    slug: "celebrar-50-cumpleanos-coruna",
    titulo: "Celebrar los 50 en A Coruña: ideas para que no parezca una comunión",
    descripcion: "Cumplir 50 merece algo más que una comida larga y una tarta con bengala. Ideas para un cumpleaños de adultos con cena, risas y baile.",
    categoria: "Cumpleaños",
    fecha: "2026-11-06",
    lectura: 5,
    foto: FOTOS.cumpleanos,
    bloques: [
      { tipo: "p", texto: "Cumplir 50 tiene algo especial: ya no tienes que demostrar nada, pero todavía te apetece celebrarlo a lo grande. El problema es que muchos cumpleaños de 50 acaban pareciendo una comunión: comida larga, sobremesa eterna y a las seis de la tarde cada uno a su casa. Si quieres algo distinto, sigue leyendo." },
      { tipo: "h2", texto: "Junta a todos tus mundos" },
      { tipo: "p", texto: "A los 50 tienes amigos del colegio, compañeros de trabajo, familia, la cuadrilla de siempre y los amigos de tu pareja. Lo difícil es que se mezclen. Un plan de [cumpleaños para adultos](/cumpleanos-coruna/) con cena, espectáculo y baile hace ese trabajo por ti: el show rompe el hielo y en la pista nadie pregunta de qué os conocéis." },
      { tipo: "h2", texto: "Música para varias generaciones" },
      { tipo: "p", texto: "Vas a tener invitados de 20 y de 75. La clave es una música que funcione para todos: clásicos que se saben los padres, éxitos de los 80 y 90 que son tuyos, y lo de ahora para los sobrinos. Un buen DJ lee la pista y la va llevando." },
      { tipo: "h2", texto: "Tres formatos que funcionan" },
      { tipo: "lista", items: ["Cena baile con otros grupos: tu mesa, tu gente y una sala con ambiente desde el primer minuto. Ideal hasta unas 20 o 30 personas.", "[Fiesta en exclusiva](/eventos-privados-coruna/): solo tus invitados, el día que quieras, en un espacio o incluso en tu casa o finca.", "Comida con fiesta: si hay mucha familia con niños, una comida que acaba bailando también es un planazo."] },
      { tipo: "h2", texto: "Lo que no debería faltar" },
      { tipo: "lista", items: ["Un momento para el brindis (corto: el homenajeado eres tú, no el discurso).", "Una foto de grupo antes del baile, cuando todos están presentables.", "La tarta, pactada antes con quien organiza.", "Un plan para volver a casa."] },
      { tipo: "cita", texto: "A los 50 no se cumplen años. Se celebran." },
      { tipo: "cta", texto: "¿Te ves celebrando así tus 50? Cuéntanos la fecha y cuántos seréis.", href: "/cumpleanos-coruna/", boton: "Ver cumpleaños de adultos" },
    ],
  },
];

/** Hoy en España (yyyy-mm-dd). */
const hoy = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
export const publicado = (p: Post) => p.fecha <= hoy();

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug && publicado(p));
export const postsPorSlug = (slugs: string[]) => slugs.map(getPost).filter((p): p is Post => !!p);
export const postsOrdenados = () => POSTS.filter(publicado).sort((a, b) => b.fecha.localeCompare(a.fecha));
/** Todos, incluidos los programados (solo para la documentación interna). */
export const calendario = () => [...POSTS].sort((a, b) => a.fecha.localeCompare(b.fecha));

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const fechaPost = (iso: string) => fmt.format(new Date(`${iso}T12:00:00Z`));
