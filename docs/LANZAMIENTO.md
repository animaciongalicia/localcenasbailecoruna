# Lanzamiento: de WordPress a esta web

## Antes de tocar nada (30 min)
1. **Copia de WordPress**: exportación completa (ya hay XML del 05/11/2026), copia de `wp-content/uploads` y de la base de datos desde el panel del hosting.
2. **Apunta los registros DNS actuales** de `los7pc.com` en Piensa Solutions (captura de pantalla): `A` de `@`, `CNAME`/`A` de `www`, `MX`, `TXT` y el `CNAME` de `navidad`. Es tu plan de vuelta atrás.
3. **No canceles el hosting de WordPress** hasta pasadas 2–3 semanas.
4. Si puedes, baja el TTL de `@` y `www` a 300 s unas horas antes.

## Vercel
1. vercel.com → *Add New → Project* → importa `animaciongalicia/localcenasbailecoruna`.
2. *Settings → Git → Production Branch*: la rama con esta web (`claude/charming-cerf-c8jjue`, o `main` si la fusionas).
3. Variables de entorno (opcionales): ver `.env.example`. `NEXT_PUBLIC_SITE_URL=https://www.los7pc.com`.
4. *Deploy*. Revisa la URL `*.vercel.app` (lleva `noindex`, es normal: solo producción indexa).
5. *Settings → Domains*: añade `www.los7pc.com` (principal) y `los7pc.com` (redirige a www).

## DNS en Piensa Solutions (solo web; no toques el correo)
| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | el que indique Vercel (normalmente `76.76.21.21`) |
| CNAME | `www` | el que indique Vercel (normalmente `cname.vercel-dns.com.`) |

- **No** cambies los `MX` ni los `TXT` del correo. **No** cambies los nameservers a Vercel.
- **No borres el `CNAME` de `navidad`**: sigue haciendo falta para que los anuncios y enlaces antiguos lleguen (ver abajo).

## Integrar Navidad y retirar el subdominio (sin perder anuncios)
La Navidad ahora vive en `https://www.los7pc.com/cenas-navidad-coruna/`. El subdominio no se borra: se **redirige**.
1. Antes de nada, en el proyecto de Vercel de Navidad (`cenas-navidad-2026`) → *Settings → Environment Variables*:
   copia a este proyecto `NEXT_PUBLIC_GADS_ID`, `NEXT_PUBLIC_GADS_LABEL_WHATSAPP`, `NEXT_PUBLIC_GADS_LABEL_PHONE`,
   `NEXT_PUBLIC_GADS_LABEL_FORM` y `NEXT_PUBLIC_META_PIXEL_ID`. Sin esto, **las conversiones de los anuncios dejan de contarse**.
2. Proyecto de Navidad → *Settings → Domains* → quita `navidad.los7pc.com`.
3. Este proyecto → *Settings → Domains* → añade `navidad.los7pc.com` (sin redirección en Vercel: la hace la web).
   El `CNAME navidad` de Piensa Solutions ya apunta a Vercel, no se toca.
4. Comprueba: `https://navidad.los7pc.com/?g=empresas` → 301 a `https://www.los7pc.com/cenas-navidad-coruna/?g=empresas`.
5. Google Ads / Meta: cambia las URL finales a `https://www.los7pc.com/cenas-navidad-coruna/?g=…` en cuanto puedas
   (la redirección cubre el hueco, pero Google prefiere URL finales sin redirección).
6. El proyecto de Navidad en Vercel se puede pausar después; no hace falta borrarlo ya.
7. Pasada la campaña (febrero), si ya no llega tráfico al subdominio, puedes quitar el `CNAME navidad`.

## Comprobaciones tras el cambio (cuando Vercel muestre el dominio "Valid")
- `https://www.los7pc.com/` carga la web nueva y `https://los7pc.com/` redirige a www.
- Ver código fuente: **no** hay `noindex` en producción; sí está `google-site-verification`.
- `https://www.los7pc.com/robots.txt` incluye el sitemap; `https://www.los7pc.com/sitemap.xml` lista 9 URLs.
- Prueba 3 redirecciones: `/tarifa/` → `/menus-precios/`, `/contacto/` → `/reservas/`, `/local/` → `/club-nautico-oza/`.
- Prueba un 410: `/pub-puticlub-coruna-mas-de-10-anos-en-la-brecha/` debe decir "Esta página ya no existe".
- WhatsApp y llamada desde el móvil (sin enviar el mensaje si no quieres).
- El correo `info@los7pc.com` sigue recibiendo.
- Search Console: *Sitemaps* → envía `sitemap.xml`. *Inspección de URL* → solicita indexar la home.
- Google Ads: revisa que ninguna URL final apunte a una página antigua retirada (las de Navidad van al subdominio y no cambian).

## Vuelta atrás
Si algo falla: en Piensa Solutions restaura los valores de `@` y `www` apuntados en el paso 2. WordPress vuelve en lo que tarde el TTL.

## Después
- Semana 1–4: Search Console → *Páginas* y *Rendimiento*. Compara **solo búsquedas comerciales** ("cena baile coruña", "cenas de empresa coruña"…) y consultas por WhatsApp/llamada. El tráfico total bajará: se ha retirado contenido de pubs, strippers y "puticlub" que no traía clientes.
- Considera la estacionalidad: compara con el mismo periodo del año anterior, no con el mes previo.
