# Migración de URLs desde WordPress

Fuente: exportación `los7pc-cenasbailecorua.WordPress.2026-11-05.xml` (340 elementos: 44 páginas, 61 entradas,
205 adjuntos publicados) + páginas de Search Console (abril–octubre 2026). Regenerar con:

```bash
python3 -I scripts/generar-migracion.py ruta/al/export.xml
```

Resultado: **37 redirecciones 301** (`lib/redirecciones.mjs`) y **282 rutas 410** (`lib/retiradas.json`).
Tabla completa con motivo y validación: `docs/redirecciones.csv`. Inventario: `docs/inventario-wordpress.csv`.

## Decisiones principales
| Antes | Ahora | Por qué |
|---|---|---|
| `/cena-baile-espectaculo-coruna/`, `/cenas-baile/`, `/restaurante-cenas-show-grupos-coruna/`, `/cena-baile-19-noviembre/` | `/` (301) | Misma intención que la home; se evita que compitan entre sí |
| `/tarifa/` y packs | `/menus-precios/` | Precios vigentes |
| `/local/…`, `/local-cenas-despedidas-tematicas-coruna/…`, `/quienes-somos/` | `/club-nautico-oza/` | Sede actual y quién organiza |
| `/despedidas-tematicas-coruna/…`, `/despedidas/…`, despedidas conjuntas | `/cenas-despedidas-coruna/` | Cena de despedida |
| `/cenas-celebraciones-coruna/` | `/celebraciones-coruna/` | Equivalente |
| `/contacto/`, `/condiciones/` | `/reservas/` | Consulta y confirmación |
| `/halloween/` | `/` | Halloween retirado por ahora (decisión de Pablo) |
| Puticlub, reseñas de pubs y discotecas, strippers, drag, actividades, limusinas, alojamiento, artículos antiguos, adjuntos | **410** | Fuera de la oferta; confundían la marca. No se redirigen a la home (eso sería un "soft 404"). |

Además, el middleware devuelve 410 a `/wp-content/`, `/wp-admin`, `/feed`, `/category/`, `/tag/`, `/author/` y `/?p=…`.
Cualquier otra URL desconocida da 404.

## Comprobado
`scripts/verificar.mjs` comprueba cada 301 (código y destino, sin cadenas) y cada 410. Última ejecución: todo OK.
Excepción conocida: una URL antigua escrita **sin** barra final (p. ej. `/tarifa`) hace dos saltos (`/tarifa` → `/tarifa/` → `/menus-precios/`). WordPress siempre usó barra final, así que los enlaces reales no se ven afectados.

## Revisión 12 nov 2026: cero 404 en URLs antiguas

Probadas 912 URLs del sitio antiguo (XML de WordPress, inventario, CSV de Search Console), con y sin barra final:
- 1.133 respuestas → 410 (retiradas a propósito: puticlub, strippers, adjuntos, wp-*).
- 120 → 200 (directas o tras una redirección 301).
- 0 → 404.

Redirecciones de seguridad añadidas a mano en `lib/redirecciones-extra.mjs` (el generador no las toca):
archivos por fecha y paginación de WordPress, IDs numéricos, sitemaps de plugins, favicon, páginas sueltas del XML
(paseos en barco, alojamientos, descargar ofertas, rockit…) y nombres probables (/blog, /navidad, /menus, /precios, /reservar…).
Variantes mal escritas del antiguo «pub-puticlub…» → 410 por prefijo en middleware.
