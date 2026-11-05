import { MENU, OFERTAS, SEDE } from "./sitio";

export type Pregunta = { p: string; r: string };

// Regla: los importes solo aparecen en FAQ_PRECIOS (página Menú y precios). El resto remite allí.
const T = OFERTAS.temporada;
const N = OFERTAS.navidad;

const incluye: Pregunta = {
  p: "¿Qué incluye la cena baile?",
  r: "Cena sentada con entrantes, principal y postre, bebida durante la cena (vino, sangría, refrescos y cerveza), una hora de show cómico y DJ con baile hasta las 3. Las copas del baile van aparte. El precio por persona lo tienes en la página de Menú y precios.",
};
const cuanto: Pregunta = {
  p: "¿Cuánto cuesta?",
  r: "La cena baile con otros grupos tiene un precio cerrado por persona, publicado en Menú y precios. Los eventos en exclusiva se presupuestan según fecha, personas, comida y lugar.",
};
const grupoPequeno: Pregunta = {
  p: "Somos un grupo pequeño. ¿Podemos venir?",
  r: "Sí. Se aceptan grupos pequeños, de 6, 8, 10 o 15 personas: cada grupo tiene su mesa y comparte la noche con otros grupos. El ambiente ya viene hecho.",
};
const fechas: Pregunta = {
  p: "¿Qué días hay cena baile?",
  r: `La cena baile con otros grupos es ${T.temporada}. No hay un calendario cerrado: las noches se abren según las reservas de los grupos. Escribe con tu fecha y te digo si encaja o qué noches hay cerca. En exclusiva, cualquier día del año.`,
};
const consulta: Pregunta = {
  p: "Si envío la consulta, ¿ya tengo la reserva?",
  r: "Todavía no. La consulta sirve para ver si hay hueco para tu grupo en esa fecha. La reserva queda confirmada cuando recibes las condiciones por escrito y haces el pago de confirmación.",
};
const dietas: Pregunta = { p: "¿Hay menú vegetariano, vegano o para alergias?", r: MENU.dietas };
const copas: Pregunta = { p: "¿Las copas están incluidas?", r: `En la cena, la bebida sí. ${MENU.copas}` };
const horario: Pregunta = {
  p: "¿A qué hora empieza y termina?",
  r: "Los grupos llegan entre las 22:00 y las 22:30. Cena con DJ hasta medianoche, show cómico de 00:00 a 01:00 y después baile. Se cierra entre las 2:30 y las 3:00, según la fiesta.",
};
const aparcamiento: Pregunta = { p: "¿Dónde es y se puede aparcar?", r: `En el ${SEDE.nombre}, ${SEDE.direccion}, ${SEDE.ciudad}. ${SEDE.aparcamiento}` };
const medida: Pregunta = {
  p: "¿Se puede hacer solo para nuestro grupo?",
  r: "Sí. La misma noche (cena, DJ, show y baile) se organiza en exclusiva para tu grupo cualquier día del año, en comida o en cena: en el Club Náutico de Oza, en otro espacio o en vuestro propio local. El DJ y el show son propios, así que la fecha depende de la agenda.",
};
const directo: Pregunta = {
  p: "¿Con quién reservo?",
  r: "Directamente con quien organiza la noche. Hablas por WhatsApp, teléfono o email con la misma persona que la prepara, sin intermediarios.",
};
const show: Pregunta = {
  p: "¿Cómo es el show?",
  r: "Una hora de humor con participación del público, de medianoche a la una. Nadie está obligado a salir, pero más de uno acaba siendo protagonista. Los detalles te los cuento al reservar.",
};
const noBaila: Pregunta = {
  p: "Hay gente que no baila. ¿Se aburrirá?",
  r: "La cena y el show ya son medio plan. Y quien prefiera retirarse antes del baile, puede hacerlo sin que se note. La música es para distintas generaciones, así que suele haber sorpresas.",
};
const fiestaPrivada: Pregunta = {
  p: "¿Podemos montar la fiesta en nuestro propio local?",
  r: "Sí. Si tenéis restaurante, finca o un espacio de empresa, se lleva el concepto completo: comida o cena, DJ, show cómico y baile. Cuéntame el sitio y el número de personas y te paso propuesta.",
};
const vuelta: Pregunta = {
  p: "¿Cómo volvemos a casa a las 3?",
  r: "Conviene dejarlo resuelto antes: taxis compartidos, un conductor que no bebe o un traslado de grupo. Si sois muchos, pregúntame y te digo opciones.",
};

export const FAQ_HOME: Pregunta[] = [incluye, cuanto, grupoPequeno, fechas, horario, show, copas, dietas, consulta, aparcamiento];

export const FAQ_CUMPLE: Pregunta[] = [
  { p: "¿Dónde celebrar un cumpleaños de adultos en Coruña?", r: `Si quieres cena, risas y baile sin organizar nada, la cena baile del ${SEDE.nombre} está pensada para eso: mesa para tu grupo, show cómico y DJ hasta las 3. Si el cumpleaños es grande, también en exclusiva, el día que quieras.` },
  { p: "¿Dónde celebrar un 50 cumpleaños en Coruña?", r: "Un 50 junta a familia, amigos de siempre y compañeros. La cena baile mezcla a todos sin esfuerzo: el show rompe el hielo y la música es para distintas generaciones." },
  { p: "¿Se puede llevar tarta?", r: "Cuéntalo al hacer la consulta y lo vemos para tu fecha. Mejor avisarlo antes que aparecer con ella en la puerta." },
  { p: "¿Puedo invitar a gente que no se conoce entre sí?", r: "Es de lo más habitual. La cena, el show y el baile hacen que el grupo se mezcle sin que tengas que hacer de animador." },
  { p: "¿Y si es sorpresa?", r: "Se puede. Dímelo en la consulta y coordinamos la llegada del homenajeado con quien organiza." },
  grupoPequeno,
  cuanto,
  medida,
  dietas,
  consulta,
];

export const FAQ_EMPRESA: Pregunta[] = [
  { p: "¿Cuántas personas pueden venir de la empresa?", r: "Desde un departamento de 6 personas hasta la plantilla entera. Con grupos pequeños, la cena con otros grupos funciona muy bien; con grupos grandes, la opción en exclusiva." },
  { p: "¿Se puede hacer como comida en vez de cena?", r: "Sí, en exclusiva para la empresa. Muchas plantillas con turnos o familias lo prefieren al mediodía." },
  { p: "¿Podéis venir a nuestras instalaciones?", r: "Sí. Se lleva el concepto completo (comida o cena, DJ, show y baile) a vuestro espacio o al sitio que elijáis." },
  { p: "¿Cómo se gestionan las bajas de última hora?", r: "Las condiciones de confirmación y cambios de asistentes se envían por escrito antes de cualquier pago, para que puedas cerrarlas con tu empresa." },
  noBaila,
  show,
  cuanto,
  dietas,
  vuelta,
];

export const FAQ_DESPEDIDA: Pregunta[] = [
  { p: "¿El show es para el novio o la novia?", r: "Es un show de humor con participación del público. Si queréis que el protagonista tenga su momento, dilo al reservar." },
  { p: "¿Podemos venir disfrazados?", r: "Cuéntanos la idea en la consulta. Lo normal es que cada grupo venga como quiera." },
  { p: "¿Hay más despedidas esa noche?", r: "Es habitual coincidir con otras despedidas, cumpleaños y grupos: es parte de la gracia. Si queréis la noche solo para vosotros, existe la opción en exclusiva." },
  { p: "¿Y antes o después de la cena?", r: "Esta web es la parte de la noche: cena, show y baile. Para actividades, alojamiento o packs completos tienes despedidascoruna.es." },
  { p: "¿Cuándo hay cenas de despedida?", r: `La cena baile con otros grupos es ${T.temporada}, que es cuando más despedidas hay. Consulta tu fecha con tiempo.` },
  grupoPequeno,
  cuanto,
  copas,
  consulta,
];

export const FAQ_CELEBRACIONES: Pregunta[] = [
  { p: "¿Cómo organizo la fiesta de jubilación de un compañero?", r: "Elige fecha con margen, cuenta con empresa y familia, decide si queréis compartir noche o hacerlo en exclusiva, y reserva un momento para unas palabras y el regalo. El resto (cena, show y baile) ya está resuelto." },
  { p: "¿Puede venir la familia del jubilado?", r: "Claro. Es de lo más habitual: compañeros, pareja, hijos y amigos en la misma celebración." },
  { p: "¿Se puede hacer un homenaje con discurso?", r: "Sí. Dilo al reservar y se prevé el momento, antes del show." },
  fiestaPrivada,
  medida,
  grupoPequeno,
  cuanto,
  dietas,
  consulta,
];

export const FAQ_PRECIOS: Pregunta[] = [
  {
    p: "¿Cuánto cuesta y qué incluye?",
    r: `La cena baile con otros grupos de la temporada ${T.anio} (${T.temporada}) cuesta ${T.precio} € por persona, IVA incluido. Incluye cena sentada, bebida durante la cena, show cómico y DJ con baile hasta las 3.`,
  },
  copas,
  { p: "¿El precio lleva IVA?", r: `Sí. Los ${T.precio} € por persona son IVA incluido.` },
  { p: "¿Cuánto cuesta la cena de Navidad?", r: `Navidad es una campaña aparte: ${N.precio} € por persona en ${N.anio}, con señal de ${N.senal} € por persona para confirmar la mesa.` },
  { p: "¿Y un evento en exclusiva?", r: "Presupuesto personalizado según fecha, número de personas, comida y lugar. Te lo paso cerrado antes de confirmar." },
  dietas,
  consulta,
];

export const FAQ_ESPACIO: Pregunta[] = [aparcamiento, horario, directo, vuelta];

export const FAQ_RESERVAS: Pregunta[] = [consulta, grupoPequeno, directo, fechas, cuanto];
