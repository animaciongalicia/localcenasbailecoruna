"use client";

import { EVENTO_ABRIR_CONFIG } from "@/lib/consentimiento";

export default function BotonConfigCookies() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_CONFIG))} className="py-2 text-left underline-offset-2 hover:underline">
      Configurar cookies
    </button>
  );
}
