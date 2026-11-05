// Carga de Google tag (GA4 / Ads) y Meta Pixel SOLO tras consentimiento.
import { GA4_ID, GADS_ID, META_PIXEL_ID, type Consentimiento } from "./tracking";

let gtagCargado = false;
let pixelCargado = false;

function inyectar(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function aplicarConsentimiento(c: Consentimiento) {
  window.__consent = c;
  const g = (s: boolean) => (s ? "granted" : "denied");

  window.gtag?.("consent", "update", {
    ad_storage: g(c.publicidad),
    ad_user_data: g(c.publicidad),
    ad_personalization: g(c.publicidad),
    analytics_storage: g(c.analitica),
  });

  // Un único gtag.js para GA4 y Google Ads (sin etiquetas duplicadas).
  const primerId = (c.analitica && GA4_ID) || (c.publicidad && GADS_ID) || "";
  if (primerId && !gtagCargado) {
    gtagCargado = true;
    inyectar(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primerId)}`);
    window.gtag?.("js", new Date());
  }
  if (gtagCargado) {
    if (c.analitica && GA4_ID) window.gtag?.("config", GA4_ID);
    if (c.publicidad && GADS_ID) window.gtag?.("config", GADS_ID);
  }

  if (META_PIXEL_ID && c.publicidad && !pixelCargado) {
    pixelCargado = true;
    const w = window as Window;
    if (!w.fbq) {
      const fbq = function (...args: unknown[]) {
        const self = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
        if (self.callMethod) self.callMethod(...args);
        else self.queue.push(args);
      } as unknown as NonNullable<Window["fbq"]> & { push?: unknown; loaded?: boolean; version?: string; queue: unknown[] };
      fbq.queue = [];
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      w.fbq = fbq;
      (w as unknown as { _fbq: unknown })._fbq = fbq;
      inyectar("https://connect.facebook.net/en_US/fbevents.js");
    }
    w.fbq!("init", META_PIXEL_ID);
    w.fbq!("track", "PageView");
  }
  if (META_PIXEL_ID && pixelCargado && window.fbq) window.fbq("consent", c.publicidad ? "grant" : "revoke");
}
