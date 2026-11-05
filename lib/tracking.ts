// Medición: GA4 (analítica) + Google Ads y Meta (publicidad).
// Todo es no-op si falta el ID o si el visitante no ha dado su consentimiento.
// NUNCA se envían datos personales: solo página, tipo de celebración, modalidad y campaña.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    __consent?: Consentimiento;
  }
}

export type Consentimiento = { analitica: boolean; publicidad: boolean };

/** GA4 de la propiedad actual de los7pc.com (se conserva para no perder el histórico). */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-ZJ5NFSNCB1";
export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

const LABELS = {
  whatsapp_click: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP || "",
  phone_click: process.env.NEXT_PUBLIC_GADS_LABEL_PHONE || "",
  consulta_validada: process.env.NEXT_PUBLIC_GADS_LABEL_FORM || "",
} as const;

export type Evento = keyof typeof LABELS | "consulta_abierta";

const META_EVENT: Partial<Record<Evento, "Contact" | "Lead">> = {
  whatsapp_click: "Contact",
  phone_click: "Contact",
  consulta_validada: "Lead",
};

type Params = { ubicacion?: string; celebracion?: string; modalidad?: string; campana?: string };

/** Lanza un evento. `pagina` se añade sola. Ninguno de estos eventos equivale a una reserva. */
export function track(evento: Evento, params: Params = {}) {
  if (typeof window === "undefined") return;
  const c = window.__consent;
  if (!c) return;
  const datos = { pagina: window.location.pathname, ...params };

  if (c.analitica && GA4_ID && typeof window.gtag === "function") {
    window.gtag("event", evento, { ...datos, send_to: GA4_ID });
  }
  if (c.publicidad) {
    const label = (LABELS as Record<string, string>)[evento];
    if (GADS_ID && label && typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: `${GADS_ID}/${label}` });
    }
    const meta = META_EVENT[evento];
    if (META_PIXEL_ID && meta && typeof window.fbq === "function") window.fbq("track", meta);
  }
}
