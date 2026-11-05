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
- **No** toques el `CNAME` de `navidad`: la campaña de Navidad sigue igual.

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
