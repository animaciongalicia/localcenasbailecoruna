# Los7pc · Web de cenas baile en A Coruña

Web principal de **www.los7pc.com**: cenas con show cómico y DJ hasta las 3 en el Club Náutico de Oza.
Next.js 15 (App Router) + TypeScript + Tailwind. Todo el contenido comercial sale en HTML estático (indexable).
Sin base de datos, sin cuentas, sin pagos: el formulario prepara un mensaje de WhatsApp y no guarda nada.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run typecheck
npm start            # sirve el build (para las pruebas)
node scripts/verificar.mjs http://localhost:3000     # rutas, 301, 410, textos prohibidos, enlaces rotos
node scripts/navegador.cjs http://localhost:3000 .   # 360/390/768/1440 px, formulario, teclado, cookies
```

Documentación:
- [`docs/LANZAMIENTO.md`](docs/LANZAMIENTO.md): Vercel, cambio de DNS en Piensa Solutions y plan de vuelta atrás.
- [`docs/PENDIENTES.md`](docs/PENDIENTES.md): datos y material que faltan (interno, no se publica).
- [`docs/MIGRACION.md`](docs/MIGRACION.md): qué pasa con cada URL de WordPress. Detalle en `docs/redirecciones.csv`.

## Cómo editar el contenido

| Quiero cambiar… | Archivo |
|---|---|
| Precio, temporada, qué incluye, Navidad | `lib/sitio.ts` → `OFERTAS` |
| Menú, bebidas, dietas | `lib/sitio.ts` → `MENU` |
| Teléfono, WhatsApp, email | `lib/sitio.ts` → `CONTACTO` |
| Sede, dirección, aparcamiento | `lib/sitio.ts` → `SEDE` |
| Titular, CIF | `lib/sitio.ts` → `LEGAL` |
| Horario de la noche | `lib/sitio.ts` → `NOCHE` |
| Preguntas frecuentes | `lib/faq.ts` |
| Menú de navegación y tarjetas de celebraciones | `lib/paginas.ts` |
| Fotos | `public/fotos/` + `lib/fotos.ts` (solo fotos reales con derechos) |
| Texto de cada página | `app/<ruta>/page.tsx` |

Cambiar el precio en `OFERTAS.temporada.precio` lo actualiza en todas las páginas, en los datos estructurados
y en la meta descripción. Navidad (`OFERTAS.navidad`) es independiente: no hereda el precio de temporada.

**Campaña de Navidad:** `OFERTAS.navidad.destacada = true` muestra la franja superior y pone Navidad la primera
en "¿Qué celebráis?". Pásalo a `false` en enero. Las fechas y reservas de Navidad viven en
https://navidad.los7pc.com (repo `cenas-navidad-2026`); esta web enlaza allí. La URL `/cenas-navidad-coruna/`
no lleva año: cada campaña se actualiza el año en `lib/sitio.ts`.

Haz commit y Vercel redespliega solo.

## Reglas que el código respeta (no romper)
- Sin mínimos de personas, sin "aforo", sin plazas ni contadores inventados. Grupos desde 2 pueden consultar.
- La consulta **no** es una reserva: nunca se muestra "reserva confirmada".
- Datos estructurados: Los7pc como organizador (no propietario del club), sin valoraciones, sin `Event` sin fecha real.
- `scripts/verificar.mjs` falla si aparece un texto prohibido (drag, puticlub, aforo, barra libre, 1.925 €, etc.).

## Medición
- Banner de cookies propio con Consent Mode v2: nada se carga hasta que el visitante decide.
- GA4 `G-ZJ5NFSNCB1` (la propiedad actual, para no perder histórico) se carga solo con consentimiento de analítica.
- Eventos (sin datos personales; solo página, ubicación del botón, tipo de celebración y modalidad):
  `whatsapp_click`, `phone_click`, `consulta_abierta`, `consulta_validada`. **Ninguno es una reserva.**
  En GA4 márcalos como eventos clave (Administrar → Eventos clave): `whatsapp_click`, `phone_click`, `consulta_validada`.
- Google Ads y Meta Pixel: rellena las variables de `.env.example` en Vercel cuando quieras medir anuncios aquí.
- La verificación de Search Console (meta tag) ya está en el `<head>`.

## Indexación
Producción de Vercel → indexable. Previews y local → `noindex`. Se puede forzar con `NEXT_PUBLIC_INDEXAR`.
