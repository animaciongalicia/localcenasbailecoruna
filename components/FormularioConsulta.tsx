"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACTO } from "@/lib/sitio";
import { track } from "@/lib/tracking";
import { CELEBRACIONES, MODALIDADES, mailUrl, mensajeConsulta, validarConsulta, whatsappUrl, type Celebracion, type Consulta, type Errores, type Modalidad } from "@/lib/whatsapp";
import { IconoCopiar, IconoMail, IconoWhatsapp } from "./Iconos";

/**
 * Formulario mínimo de la página de Contacto. Prepara el mensaje para WhatsApp o email:
 * NO confirma reservas, NO envía nada a ningún servidor y NO guarda datos.
 */
export default function FormularioConsulta() {
  const id = useId();
  const [c, setC] = useState<Consulta>({ nombre: "", celebracion: "cumpleanos", fecha: "", personas: NaN, modalidad: "conjunta" });
  const [errores, setErrores] = useState<Errores>({});
  const [listo, setListo] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const abierto = useRef(false);
  const resultado = useRef<HTMLDivElement>(null);

  // /reservas/?modalidad=medida · ?celebracion=navidad (desde los botones de otras páginas)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = q.get("modalidad");
    const cel = q.get("celebracion");
    setC((v) => ({
      ...v,
      ...(m === "conjunta" || m === "medida" ? { modalidad: m } : {}),
      ...(CELEBRACIONES.some((x) => x.valor === cel) ? { celebracion: cel as Celebracion } : {}),
    }));
  }, []);

  const set = <K extends keyof Consulta>(k: K, v: Consulta[K]) => {
    setC((prev) => ({ ...prev, [k]: v }));
    setListo(null);
    if (!abierto.current) {
      abierto.current = true;
      track("consulta_abierta");
    }
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validarConsulta(c);
    setErrores(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setListo(mensajeConsulta(c));
    setCopiado(false);
    track("consulta_validada", { celebracion: c.celebracion, modalidad: c.modalidad });
    requestAnimationFrame(() => resultado.current?.focus());
  };

  const err = (k: keyof Errores) => (errores[k] ? <p id={`${id}-${k}-error`} className="mt-2 text-sm font-medium text-acento">{errores[k]}</p> : null);
  const aria = (k: keyof Errores) => ({ "aria-invalid": !!errores[k], "aria-describedby": errores[k] ? `${id}-${k}-error` : undefined });

  return (
    <div className="tarjeta p-5 sm:p-8">
      <form onSubmit={enviar} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-nombre`} className="etiqueta">Nombre</label>
            <input id={`${id}-nombre`} className="campo" autoComplete="given-name" value={c.nombre} onChange={(e) => set("nombre", e.target.value)} {...aria("nombre")} />
            {err("nombre")}
          </div>
          <div>
            <label htmlFor={`${id}-celebracion`} className="etiqueta">¿Qué celebráis?</label>
            <select id={`${id}-celebracion`} className="campo" value={c.celebracion} onChange={(e) => set("celebracion", e.target.value as Celebracion)}>
              {CELEBRACIONES.map((x) => <option key={x.valor} value={x.valor}>{x.etiqueta}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-fecha`} className="etiqueta">Fecha</label>
            <input id={`${id}-fecha`} className="campo" placeholder="Ej.: sábado 12 de junio, o flexible" value={c.fecha} onChange={(e) => set("fecha", e.target.value)} {...aria("fecha")} />
            {err("fecha")}
          </div>
          <div>
            <label htmlFor={`${id}-personas`} className="etiqueta">Personas (aprox.)</label>
            <input id={`${id}-personas`} className="campo" type="number" inputMode="numeric" min={2} placeholder="Ej.: 8" value={Number.isFinite(c.personas) ? c.personas : ""} onChange={(e) => set("personas", e.target.value === "" ? NaN : Number(e.target.value))} {...aria("personas")} />
            {err("personas")}
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="etiqueta">Formato</legend>
            <div className="flex flex-wrap gap-2">
              {MODALIDADES.map((m) => (
                <label key={m.valor} className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 px-4 font-medium ${c.modalidad === m.valor ? "border-acento bg-acento/5" : "border-linea"}`}>
                  <input type="radio" name={`${id}-modalidad`} value={m.valor} checked={c.modalidad === m.valor} onChange={() => set("modalidad", m.valor as Modalidad)} className="h-4 w-4 accent-[#B4441F]" />
                  {m.etiqueta}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <button type="submit" className="btn-principal mt-6 w-full sm:w-auto">Preparar mi mensaje</button>
        <p className="mt-3 text-sm text-tinta-suave">No se guarda nada en esta web. Revisas el mensaje y lo envías tú. Es una consulta, no una reserva confirmada.</p>
      </form>

      {listo && (
        <div ref={resultado} tabIndex={-1} className="mt-8 rounded-2xl border-2 border-wa bg-wa/5 p-5 outline-none" aria-live="polite">
          <p className="font-semibold">Mensaje listo. Falta un paso: enviarlo.</p>
          <p className="mt-3 rounded-xl bg-white p-4 leading-relaxed">{listo}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl(listo)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="formulario" data-modalidad={c.modalidad}><IconoWhatsapp /> Enviar por WhatsApp</a>
            <a href={mailUrl("Consulta de disponibilidad", listo)} className="btn-linea"><IconoMail /> Enviar por email</a>
            <button type="button" className="btn-linea" onClick={async () => { try { await navigator.clipboard.writeText(listo); setCopiado(true); } catch {} }}>
              <IconoCopiar /> {copiado ? "Copiado" : "Copiar"}
            </button>
          </div>
          <p className="mt-4 text-sm text-tinta-suave">¿No se abre WhatsApp? Copia el mensaje y envíalo al {CONTACTO.telefono}.</p>
        </div>
      )}
    </div>
  );
}
