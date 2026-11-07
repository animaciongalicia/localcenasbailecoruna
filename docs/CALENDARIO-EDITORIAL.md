# Calendario editorial de Noticias

Los artículos se escriben en `lib/noticias.ts` y `lib/posts-*.ts`. **Un artículo con fecha futura no aparece**
(ni en la web, ni en el sitemap, ni en el pie) hasta su día: la web se regenera sola cada hora.

## Reglas para posicionar sin canibalizar
- Cada artículo ataca **una búsqueda de cola larga distinta** (ideas, juegos, discurso…), nunca la palabra principal
  de una página de venta ("cena de empresa Coruña", "cumpleaños adultos Coruña"…).
- Cada artículo enlaza **2–3 veces dentro del texto** a su página de venta con un texto natural: `[texto](/ruta/)`.
- Mínimo **650 palabras**, foto propia, un subtítulo cada 100–150 palabras, cierre con llamada a la acción.
- Sin precios (solo en /menus-precios/), sin clientes ni anécdotas inventadas.

## Bloque 1 · Navidad y empresas — escrito y programado (todo antes de la última noche, 19 dic)
| Fecha | Artículo |
|---|---|
| 6 nov | Cómo organizar la cena de empresa de Navidad · Los 9 personajes · Celebrar los 50 |
| lun 9 nov | 12 ideas para la cena de empresa de Navidad |
| jue 12 nov | Juegos para animar una cena de empresa |
| lun 16 nov | Cómo animar una cena de empresa: 10 trucos |
| jue 19 nov | ¿Comida o cena de empresa? |
| lun 23 nov | Amigo invisible en la empresa |
| jue 26 nov | El discurso del jefe en la cena de Navidad |
| lun 30 nov | Cena de empresa con clientes |
| jue 3 dic | Cena de Navidad con amigos en Coruña |
| lun 7 dic | Qué ponerse para la cena de empresa |
| jue 10 dic | Cena de Navidad para una empresa pequeña |
| lun 14 dic | Cena de empresa a última hora |
| jue 17 dic | Las canciones que siempre suenan en la cena de empresa |

## Bloque 2 · Despedidas — 26 dic a 15 mar, 2 por semana
Escritos y programados:
| Fecha | Artículo |
|---|---|
| sáb 26 dic | Despedida de soltera en Coruña: el plan de noche que funciona |
| mié 30 dic | 12 retos para la despedida de soltero que no acaban en urgencias |
| sáb 2 ene | Despedidas mixtas: cómo organizarlas |
| mar 5 ene | Cómo organizar una despedida sin morir en el grupo de WhatsApp |
| sáb 9 ene | Los 9 personajes de toda despedida |
| mar 12 ene | ¿Con cuánta antelación reservar una despedida? |

Pendientes de escribir (mismo ritmo):
| Fecha | Artículo propuesto |
|---|---|
| 16 ene | Juegos para la cena de despedida (sin pasarse) |
| 19 ene | Despedida de soltero en Coruña: el plan de noche |
| 23 ene | Disfraces y camisetas para despedidas: ideas con gracia (y cómodas para cenar) |
| 26 ene | Despedida sorpresa: cómo no estropearla |
| 30 ene | Qué regalar a la novia (o al novio) en la despedida |
| 2 feb | Despedida con presupuesto ajustado: cómo hacerla grande sin gastar de más |
| 6 feb | Despedida para grupos grandes (20+): cómo no perder a nadie |
| 9 feb | Despedidas de 40 y más: la despedida tardía también se celebra |
| 13 feb | San Valentín para solteros: la última noche de libertad (humor) |
| 16 feb | Despedida de día y de noche en Coruña: el plan completo (con despedidascoruna.es) |
| 20 feb | Errores típicos en despedidas (y cómo evitarlos) |
| 23 feb | Qué hacer si llueve en la despedida (Coruña edition) |
| 27 feb | Cómo cobrar el bote de la despedida sin perder amigos |
| 2 mar | Despedida para la novia que no quiere despedida |
| 6 mar | Frases y brindis para la despedida |
| 9 mar | La foto perfecta de la despedida: ideas |
| 13 mar | Checklist definitivo de la despedida |

Después de marzo: **2 al mes**.

## Bloque 3 · Cumpleaños (abril–junio, 2 al mes)
- Sitios para celebrar un cumpleaños de adultos: qué mirar antes de reservar.
- Celebrar los 40 sin que parezca una crisis.
- Celebrar los 30: ideas para la cuadrilla.
- Cumpleaños sorpresa para adultos: cómo no estropearlo.
- 60 cumpleaños: celebrar con hijos, nietos y amigos.

## Bloque 4 · Jubilaciones y aniversarios (junio–septiembre, 2 al mes)
- Discurso de jubilación: ideas y ejemplos.
- Cómo organizar una fiesta de jubilación sorpresa.
- Regalos de jubilación que no son un reloj.
- Bodas de plata: cómo celebrarlas con los amigos.
- Reencuentro de antiguos alumnos: cómo organizarlo.

## Actualización 7 nov 2026 (acelerar ahora, suave en temporada)

**Navidad adelantada:** los 12 artículos de Navidad se publican entre el 7 y el 14 de noviembre.

**Nuevos (lib/posts-nuevos.ts):**

| Fecha | Artículo | Categoría |
|---|---|---|
| 9 nov | Cena de empresa para 50, 80 o 120 personas | Empresas |
| 11 nov | Cómo conseguir que vaya toda la plantilla | Empresas |
| 13 nov | Qué tiene que incluir una cena de empresa de Navidad | Empresas |
| 18 nov | La cena de empresa en enero, después de Reyes | Empresas |
| 25 nov | Cena de reencuentro de antiguos alumnos | Grupos (nuevo) |
| 2 dic | Cena de clubes, peñas y asociaciones | Grupos (nuevo) |
| 9 dic | Despedida de un compañero que se va | Grupos (nuevo) |
| 20 ene | Cumpleaños sorpresa para adultos | Cumpleaños |
| 3 feb | Celebrar los 40 en A Coruña | Cumpleaños |
| 17 feb | Despedida de soltera tranquila | Despedidas |
| 3 mar | Ideas de homenaje para una jubilación | Jubilaciones |
| 14 abr | Cena de fin de curso para profesores | Grupos (nuevo) |
| 12 may | Cena de empresa de verano | Empresas |

Las despedidas ya escritas siguen del 26 dic al 12 ene. Ritmo a partir de marzo: 1–2 al mes.
Los enlaces a artículos aún no publicados se muestran como texto normal hasta su fecha (sin 404).
