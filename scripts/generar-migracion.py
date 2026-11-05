"""Genera el mapa de migración desde WordPress.

Uso:  python3 -I scripts/generar-migracion.py <export-wordpress.xml>

Salidas:
  docs/inventario-wordpress.csv   todas las URLs del XML (tipo, estado, fechas, título)
  docs/redirecciones.csv          URL antigua · código · destino · motivo · validación
  lib/redirecciones.mjs           301 que usa next.config.mjs
  lib/retiradas.json              rutas que responden 410 (contenido retirado sin equivalente)

Las decisiones están en DESTINOS (abajo). Todo lo publicado que no aparezca ahí se retira con 410.
"""
import csv, json, sys, xml.etree.ElementTree as ET
from urllib.parse import urlparse

NS = {"wp": "http://wordpress.org/export/1.2/", "content": "http://purl.org/rss/1.0/modules/content/"}
DOM = "https://www.los7pc.com"

# ruta antigua → (destino, motivo, validación)
DESTINOS = {
    "/cena-baile-espectaculo-coruna/": ("/", "Misma intención que la home (cena baile). Se consolida para no competir con ella.", "Search Console: vigilar 'cena baile coruña'"),
    "/cenas-baile/": ("/", "Misma intención que la home.", ""),
    "/cena-baile-19-noviembre/": ("/", "Página de una fecha pasada; intención cena baile.", "No está en el XML: URL vista en Search Console"),
    "/cena-baile-19-nov/": ("/", "Enlace de menú antiguo hacia la cena baile.", "No está en el XML: URL del menú"),
    "/cena-espectaculo-que-incluye-que-ambiente-hay-y-para-quien-es/": ("/", "El artículo explica la experiencia: ahora lo cubre la home.", ""),
    "/restaurante-cenas-show-grupos-coruna/": ("/", "Restaurante de cenas con show para grupos = experiencia principal.", ""),
    "/restaurante-grupos/": ("/", "Enlace de menú 'Restaurante'.", "No está en el XML: URL del menú"),
    "/halloween/": ("/", "Halloween retirado por ahora; la búsqueda 'cena halloween coruña' es de cena baile.", "Si vuelve Halloween: crear /cena-halloween-coruna/ y cambiar este destino"),
    "/cenas-celebraciones-coruna/": ("/celebraciones-coruna/", "Equivalente directo.", ""),
    "/celebraciones/": ("/celebraciones-coruna/", "Enlace de menú 'Celebraciones'.", "No está en el XML: URL del menú"),
    "/despedidas-tematicas-coruna/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", ""),
    "/despedidas-tematicas-coruna/despedidas-de-soltero/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", ""),
    "/despedidas-tematicas-coruna/despedida-de-soltera/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", ""),
    "/despedidas/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", "No está en el XML: URL vista en Search Console"),
    "/despedidas/despedidas-de-soltero/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", "No está en el XML"),
    "/despedidas/despedida-de-soltera/": ("/cenas-despedidas-coruna/", "Cenas para despedidas.", "No está en el XML"),
    "/despedidas-conjuntas-en-coruna/": ("/cenas-despedidas-coruna/", "Despedida conjunta = cena baile conjunta.", ""),
    "/despedidas-conjuntas-en-coruna-2/": ("/cenas-despedidas-coruna/", "Despedida conjunta = cena baile conjunta.", ""),
    "/organizar-despedidas-conjuntas-en-coruna/": ("/cenas-despedidas-coruna/", "Despedida conjunta = cena baile conjunta.", ""),
    "/local-para-despedidas-coruna/": ("/cenas-despedidas-coruna/", "Local de cenas para despedidas.", ""),
    "/tarifa/": ("/menus-precios/", "Precios vigentes.", ""),
    "/tarifa/pack-basico/": ("/menus-precios/", "Precios vigentes.", ""),
    "/tarifa/pack-completo/": ("/menus-precios/", "Precios vigentes.", ""),
    "/ofertas-y-packs-para-despedidas-de-soltero/": ("/menus-precios/", "Precios vigentes.", ""),
    "/condiciones/": ("/reservas/", "Cómo se consulta y se confirma una reserva.", "Faltan las condiciones 2027 por escrito"),
    "/local-cenas-despedidas-tematicas-coruna/": ("/club-nautico-oza/", "El local → sede actual.", ""),
    "/local-cenas-despedidas-tematicas-coruna/localizacion/": ("/club-nautico-oza/", "Localización → sede actual.", ""),
    "/local-cenas-despedidas-tematicas-coruna/galeria/": ("/club-nautico-oza/", "Galería → fotos de la sede actual.", ""),
    "/local/": ("/club-nautico-oza/", "El local → sede actual.", "No está en el XML: URL vista en Search Console"),
    "/local/galeria/": ("/club-nautico-oza/", "Galería → sede actual.", "No está en el XML"),
    "/local/localizacion/": ("/club-nautico-oza/", "Localización → sede actual.", "No está en el XML"),
    "/quienes-somos/": ("/club-nautico-oza/", "Quién organiza y trayectoria.", ""),
    "/quienes-somos/los7pc/": ("/club-nautico-oza/", "Quién organiza y trayectoria.", "No está en el XML"),
    "/contacto/": ("/reservas/", "Contacto → consulta y reservas.", ""),
    "/navidad-2026/": ("/cenas-navidad-coruna/", "Enlace de menú 'Navidad 2026'.", "No está en el XML: URL del menú"),
    "/politica-de-cookies/": ("/cookies/", "Página legal equivalente.", ""),
    "/mas-informacion-sobre-las-cookies/": ("/cookies/", "Página legal equivalente.", ""),
}

# Rutas sin equivalente vistas en Search Console que no están en el XML (se retiran con 410).
EXTRA_RETIRADAS = [
    "/pub-puticlub-coruna-mas-de-10-anos-en-la-brecha/despedidas-puticlub-coruna-cenas-tematicas/",
    "/shows/strippers/striper-strip-coruna-despedidas/",
    "/halloween/cena-baile-halloween-coruna-hotel-fiesta-grupos/",
    "/halloween/cena-baile-hallowen-coruna-1920-x-1080-px-1/",
    "/alojamiento/hoteles/",
]


def ruta(url: str) -> str:
    p = urlparse(url).path or "/"
    return p if p.endswith("/") else p + "/"


def main(xml: str) -> None:
    ch = ET.parse(xml).getroot().find("channel")
    filas = []
    for it in ch.findall("item"):
        g = lambda k: (it.findtext(k, namespaces=NS) or "").strip()
        filas.append({"tipo": g("wp:post_type"), "estado": g("wp:status"), "publicado": g("wp:post_date")[:10],
                      "modificado": g("wp:post_modified")[:10], "url": g("link"), "titulo": g("title")})
    with open("docs/inventario-wordpress.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(filas[0])); w.writeheader(); w.writerows(filas)

    publicas = {}
    for r in filas:
        if r["tipo"] in ("page", "post") and r["estado"] == "publish" or r["tipo"] == "attachment" and r["estado"] == "inherit":
            if r["url"].startswith(DOM) and "?" not in r["url"]:
                publicas.setdefault(ruta(r["url"]), r)

    redir, retiradas, tabla = [], set(), []
    for p, (dest, motivo, val) in DESTINOS.items():
        redir.append((p, dest))
        tabla.append({"url_antigua": p, "codigo": 301, "destino": dest, "motivo": motivo, "validacion": val or "OK con XML y Search Console"})
    for p, r in sorted(publicas.items()):
        if p == "/" or p in DESTINOS:
            continue
        retiradas.add(p)
        motivo = "Adjunto de WordPress (página de imagen) sin valor propio" if r["tipo"] == "attachment" else \
                 "Contenido ajeno a la oferta de cenas (pubs, actividades, shows, artículos antiguos)"
        tabla.append({"url_antigua": p, "codigo": 410, "destino": "", "motivo": motivo, "validacion": "Revisar si algún enlace externo importante apunta aquí"})
    for p in EXTRA_RETIRADAS:
        if p not in retiradas:
            retiradas.add(p)
            tabla.append({"url_antigua": p, "codigo": 410, "destino": "", "motivo": "Vista en Search Console, sin equivalente", "validacion": "No está en el XML"})

    with open("docs/redirecciones.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(tabla[0])); w.writeheader(); w.writerows(tabla)
    with open("lib/redirecciones.mjs", "w") as f:
        f.write("// GENERADO por scripts/generar-migracion.py — no editar a mano.\n")
        f.write("// [origen, destino] → 301 permanente. Se usa en next.config.mjs.\n")
        f.write("export const REDIRECCIONES = " + json.dumps(redir, ensure_ascii=False, indent=1) + ";\n")
    with open("lib/retiradas.json", "w") as f:
        json.dump(sorted(p.rstrip("/") for p in retiradas), f, ensure_ascii=False, indent=0)
    print(f"{len(filas)} elementos en el XML · {len(redir)} redirecciones 301 · {len(retiradas)} rutas 410")


if __name__ == "__main__":
    main(sys.argv[1])
