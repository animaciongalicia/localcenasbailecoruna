import { MENU, OFERTAS, SEDE } from "./sitio";

export type Pregunta = { p: string; r: string };

const T = OFERTAS.temporada;

const precio: Pregunta = {
  p: "¿Cuánto cuesta y qué incluye?",
  r: `La cena baile conjunta de la temporada ${T.anio} (${T.temporada}) cuesta ${T.precio} € por persona, IVA incluido. Incluye cena sentada, bebida durante la cena (vino, sangría, refrescos y cerveza), show cómico y DJ con baile hasta las 3. Las copas del baile se pagan aparte, en la barra.`,
};
const grupoPequeno: Pregunta = {
  p: "Somos un grupo pequeño. ¿Podemos venir?",
  r: "Sí. Se aceptan grupos pequeños, de 6, 8, 10 o 15 personas: cada grupo tiene su mesa y comparte la noche con otros grupos. El ambiente ya viene hecho.",
};
const fechas: Pregunta = {
  p: "¿Qué días hay cena baile?",
  r: `La temporada va ${T.temporada}. No hay un calendario cerrado: las noches se abren según las reservas de los grupos. Escribe con tu fecha y te digo si encaja o qué noches hay cerca.`,
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
  p: "¿Y si queremos algo solo para nuestro grupo?",
  r: "Se puede pedir una celebración a medida: menú sentado o catering de pie, con o sin DJ, con o sin show. Depende de la fecha, el número de personas y lo que queráis. Pide propuesta y te paso presupuesto personalizado.",
};
const directo: Pregunta = {
  p: "¿Con quién reservo?",
  r: "Directamente con quien organiza la noche. Hablas por WhatsApp o por teléfono con la misma persona que la prepara, sin intermediarios.",
};

export const FAQ_HOME: Pregunta[] = [precio, grupoPequeno, fechas, horario, copas, dietas, consulta, aparcamiento];

export const FAQ_CUMPLE: Pregunta[] = [
  { p: "¿Dónde celebrar un 50 cumpleaños en Coruña?", r: `Si quieres cena, risas y baile sin organizar nada, la cena baile del ${SEDE.nombre} está pensada para eso: mesa para tu grupo, show cómico y DJ hasta las 3. Si el cumpleaños es grande, se puede pedir un formato a medida.` },
  { p: "¿Se puede llevar tarta?", r: "Cuéntalo al hacer la consulta y lo vemos para tu fecha. Mejor avisarlo antes que aparecer con ella en la puerta." },
  { p: "¿Puedo invitar a gente que no se conoce entre sí?", r: "Es de lo más habitual. La cena, el show y el baile hacen que el grupo se mezcle sin que tengas que hacer de animador." },
  grupoPequeno,
  precio,
  medida,
  consulta,
];

export const FAQ_EMPRESA: Pregunta[] = [
  { p: "¿Cómo se gestionan las bajas de última hora?", r: "Las condiciones de confirmación y cambios de asistentes se envían por escrito antes de cualquier pago, para que puedas cerrarlas con tu empresa." },
  { p: "Hay gente que no baila. ¿Se aburrirán?", r: "La cena y el show ya son medio plan. Y quien quiera retirarse antes del baile, puede hacerlo sin que se note." },
  medida,
  precio,
  dietas,
];

export const FAQ_DESPEDIDA: Pregunta[] = [
  { p: "¿El show es para el novio o la novia?", r: "Es un show de humor con participación del público. Los detalles concretos te los cuento al reservar, para que sepáis qué esperar." },
  { p: "¿Podemos venir disfrazados?", r: "Cuéntanos la idea en la consulta. Lo normal es que cada grupo venga como quiera." },
  { p: "¿Y antes o después de la cena?", r: "Esta web es la parte de la noche: cena, show y baile. Para actividades, alojamiento o packs completos tienes despedidascoruna.es." },
  precio,
  grupoPequeno,
  consulta,
];

const fiestaPrivada: Pregunta = {
  p: "¿Puedo hacer una fiesta privada solo con mi grupo?",
  r: "Se puede pedir una celebración a medida. Si hay fecha disponible y el formato encaja, te paso propuesta y presupuesto personalizado. Depende del día y del número de personas, así que pregunta con tiempo.",
};

export const FAQ_CELEBRACIONES: Pregunta[] = [fiestaPrivada, medida, grupoPequeno, precio, dietas, consulta];

export const FAQ_PRECIOS: Pregunta[] = [
  precio,
  copas,
  { p: "¿El precio lleva IVA?", r: `Sí. Los ${T.precio} € por persona son IVA incluido.` },
  { p: "¿Navidad cuesta lo mismo?", r: `No necesariamente. Navidad es una campaña aparte con sus propias fechas y precio (${OFERTAS.navidad.precio} € por persona en ${OFERTAS.navidad.anio}).` },
  medida,
  dietas,
  consulta,
];

export const FAQ_ESPACIO: Pregunta[] = [aparcamiento, horario, directo];

export const FAQ_RESERVAS: Pregunta[] = [consulta, grupoPequeno, directo, fechas];
