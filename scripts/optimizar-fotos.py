"""Optimiza fotos para la web (JPG, PNG, HEIC del iPhone) y las deja en public/fotos/noches/.

Uso:  python3 scripts/optimizar-fotos.py <carpeta-con-fotos-originales>
      (necesita: pip install pillow pillow-heif)

- Máximo 1600 px por lado, calidad 72, sin datos EXIF (quita GPS y datos del móvil).
- Ignora duplicados ("foto 2.jpg", "foto 3.jpg") y archivos que no son imagen (vídeos).
- Las numera: noche-01.jpg, noche-02.jpg… a continuación de las que ya existan.
Todas las fotos de public/fotos/noches/ aparecen solas en la galería "Así son nuestras noches".
REVISA ANTES DE SUBIR: solo fotos de las cenas, sin documentos ni fotos personales.
"""
import re, sys
from pathlib import Path
from PIL import Image, ImageOps
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

origen = Path(sys.argv[1])
destino = Path(__file__).resolve().parent.parent / "public" / "fotos" / "noches"
destino.mkdir(parents=True, exist_ok=True)
n = len(list(destino.glob("noche-*.jpg")))
vistos = set()
for f in sorted(origen.iterdir()):
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png", ".heic", ".webp"}:
        continue
    base = re.sub(r" \d+$", "", f.stem)
    if base in vistos:
        continue
    vistos.add(base)
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    im.thumbnail((1600, 1600))
    n += 1
    salida = destino / f"noche-{n:02d}.jpg"
    im.save(salida, "JPEG", quality=72, optimize=True, progressive=True)
    print(f"{f.name} -> {salida.name} ({salida.stat().st_size // 1024} KB)")
