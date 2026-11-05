"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";
import { leerConsentimiento } from "@/lib/consentimiento";
import { aplicarConsentimiento } from "@/lib/tags";

/** Aplica el consentimiento guardado y mide clics en cualquier enlace tel: o wa.me (sin datos personales). */
export default function Tracking() {
  useEffect(() => {
    const c = leerConsentimiento();
    if (c) aplicarConsentimiento(c);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const ubicacion = a.dataset.ubicacion;
      if (href.startsWith("tel:")) track("phone_click", { ubicacion });
      else if (href.includes("wa.me/")) track("whatsapp_click", { ubicacion, modalidad: a.dataset.modalidad, campana: a.dataset.campana });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
