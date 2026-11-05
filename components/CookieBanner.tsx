"use client";

import { useEffect, useState } from "react";
import { EVENTO_ABRIR_CONFIG, guardarConsentimiento, leerConsentimiento } from "@/lib/consentimiento";
import { aplicarConsentimiento } from "@/lib/tags";
import type { Consentimiento } from "@/lib/tracking";

/** Banner real (Consent Mode v2): nada se carga hasta que el visitante decide. Aceptar y Rechazar pesan igual. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(false);
  const [analitica, setAnalitica] = useState(false);
  const [publicidad, setPublicidad] = useState(false);

  useEffect(() => {
    const c = leerConsentimiento();
    if (!c) setVisible(true);
    else {
      setAnalitica(c.analitica);
      setPublicidad(c.publicidad);
    }
    const abrir = () => {
      const actual = leerConsentimiento();
      setAnalitica(!!actual?.analitica);
      setPublicidad(!!actual?.publicidad);
      setConfig(true);
      setVisible(true);
    };
    window.addEventListener(EVENTO_ABRIR_CONFIG, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_CONFIG, abrir);
  }, []);

  const decidir = (c: Consentimiento) => {
    guardarConsentimiento(c);
    aplicarConsentimiento(c);
    setVisible(false);
    setConfig(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-3 bottom-[calc(var(--barra-movil)+env(safe-area-inset-bottom)+0.5rem)] z-[60] mx-auto max-w-md rounded-2xl border border-linea bg-white p-4 text-tinta shadow-2xl lg:bottom-5 lg:left-5 lg:right-auto"
    >
      <p className="text-sm leading-relaxed">
        Uso cookies para saber qué funciona en la web y en los anuncios. Solo si aceptas.{" "}
        <a href="/cookies/" className="enlace">Más info</a>
      </p>
      {config && (
        <fieldset className="mt-3 space-y-3 border-t border-linea pt-3 text-sm">
          <legend className="sr-only">Configurar cookies</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-0.5 h-5 w-5 accent-[#B4441F]" />
            <span><strong>Técnicas</strong>: necesarias para recordar esta elección.</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={analitica} onChange={(e) => setAnalitica(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#B4441F]" />
            <span><strong>Analítica</strong>: estadísticas de uso (Google Analytics).</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={publicidad} onChange={(e) => setPublicidad(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#B4441F]" />
            <span><strong>Publicidad</strong>: medir los anuncios de Google y Meta.</span>
          </label>
          <button type="button" onClick={() => decidir({ analitica, publicidad })} className="btn-linea min-h-[44px] w-full">
            Guardar mi elección
          </button>
        </fieldset>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => decidir({ analitica: false, publicidad: false })} className="btn-linea min-h-[44px] w-full px-3">
          Rechazar
        </button>
        <button type="button" onClick={() => decidir({ analitica: true, publicidad: true })} className="btn-linea min-h-[44px] w-full px-3">
          Aceptar
        </button>
      </div>
      {!config && (
        <button type="button" onClick={() => setConfig(true)} className="mt-1 min-h-[40px] w-full text-center text-sm text-tinta-suave underline underline-offset-2">
          Configurar
        </button>
      )}
    </div>
  );
}
