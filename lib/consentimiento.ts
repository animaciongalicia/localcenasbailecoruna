import type { Consentimiento } from "./tracking";

const CLAVE = "l7pc_consent_v1";
export const EVENTO_ABRIR_CONFIG = "l7pc:abrir-cookies";

export function leerConsentimiento(): Consentimiento | null {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (typeof v?.analitica === "boolean" && typeof v?.publicidad === "boolean") return v;
  } catch {}
  return null;
}

export function guardarConsentimiento(c: Consentimiento) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(c));
  } catch {}
}
