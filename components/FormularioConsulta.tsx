"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACTO } from "@/lib/sitio";
import { track } from "@/lib/tracking";
import {
  CELEBRACIONES,
  EXTRAS_MEDIDA,
  LUGARES,
  MOMENTOS,
  MODALIDADES,
  mensajeConsulta,
  validarConsulta,
  whatsappUrl,
  type Celebracion,
  type Consulta,
  type Errores,
  type Modalidad,
} from "@/lib/whatsapp";
import { IconoCopiar, IconoTelefono, IconoWhatsapp } from "./Iconos";

/**
 * Prepara una conversación por WhatsApp. NO confirma reservas, NO envía nada a ningún servidor
 * y NO guarda datos: el mensaje solo existe en el navegador hasta que el usuario lo envía en WhatsApp.
 */
export default function FormularioConsulta({
  celebracionInicial = "cumpleanos",
  modalidadInicial = "conjunta",
  campana,
}: {
  celebracionInicial?: Celebracion;
  modalidadInicial?: Modalidad;
  campana?: string;
}) {
  const id = useId();
  const [c, setC] = useState<Consulta>({
    nombre: "",
    celebracion: celebracionInicial,
    fecha: "",
    flexible: "",
    personas: NaN,
    modalidad: modalidadInicial,
    extras: [],
    lugar: "oza",
    momento: "cena",
    comentario: "",
  });
  const [errores, setErrores] = useState<Errores>({});
  const [listo, setListo] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const abierto = useRef(false);
  const resultado = useRef<HTMLDivElement>(null);

  // ?modalidad=medida desde los botones de "Dos maneras de celebrar"
  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("modalidad");
    if (m === "conjunta" || m === "medida") setC((v) => ({ ...v, modalidad: m }));
  }, []);

  const set = <K extends keyof Consulta>(k: K, v: Consulta[K]) => {
    setC((prev) => ({ ...prev, [k]: v }));
    setListo(null);
    if (!abierto.current) {
      abierto.current = true;
      track("consulta_abierta", { campana });
    }
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validarConsulta(c);
    setErrores(errs);
    if (Object.keys(errs).length) {
      const primero = document.getElementById(`${id}-${Object.keys(errs)[0]}`);
      primero?.focus();
      return;
    }
    const texto = mensajeConsulta(c);
    setListo(texto);
    setCopiado(false);
    track("consulta_validada", { celebracion: c.celebracion, modalidad: c.modalidad, campana });
    requestAnimationFrame(() => resultado.current?.focus());
  };

  const copiar = async () => {
    if (!listo) return;
    try {
      await navigator.clipboard.writeText(listo);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  const hoy = new Date().toISOString().slice(0, 10);
  const err = (k: keyof Errores) =>
    errores[k] ? (
      <p id={`${id}-${k}-error`} className="mt-2 text-sm font-medium text-acento">
        {errores[k]}
      </p>
    ) : null;

  return (
    <div className="tarjeta p-5 sm:p-8">
      <form onSubmit={enviar} noValidate aria-describedby={`${id}-nota`}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-nombre`} className="etiqueta">Tu nombre</label>
            <input
              id={`${id}-nombre`}
              className="campo"
              autoComplete="given-name"
              value={c.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined}
            />
            {err("nombre")}
          </div>

          <div>
            <label htmlFor={`${id}-celebracion`} className="etiqueta">¿Qué celebráis?</label>
            <select id={`${id}-celebracion`} className="campo" value={c.celebracion} onChange={(e) => set("celebracion", e.target.value as Celebracion)}>
              {CELEBRACIONES.map((x) => (
                <option key={x.valor} value={x.valor}>{x.etiqueta}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${id}-personas`} className="etiqueta">Personas (aprox.)</label>
            <input
              id={`${id}-personas`}
              className="campo"
              type="number"
              inputMode="numeric"
              min={2}
              placeholder="Ej.: 8"
              value={Number.isFinite(c.personas) ? c.personas : ""}
              onChange={(e) => set("personas", e.target.value === "" ? NaN : Number(e.target.value))}
              aria-invalid={!!errores.personas}
              aria-describedby={errores.personas ? `${id}-personas-error` : undefined}
            />
            {err("personas")}
          </div>

          <div>
            <label htmlFor={`${id}-cuando`} className="etiqueta">Fecha que te interesa</label>
            <input
              id={`${id}-cuando`}
              className="campo"
              type="date"
              min={hoy}
              value={c.fecha}
              onChange={(e) => set("fecha", e.target.value)}
              aria-invalid={!!errores.cuando}
              aria-describedby={errores.cuando ? `${id}-cuando-error` : `${id}-flex-ayuda`}
            />
          </div>
          <div>
            <label htmlFor={`${id}-flex`} className="etiqueta">…o fechas flexibles</label>
            <input
              id={`${id}-flex`}
              className="campo"
              placeholder="Ej.: cualquier sábado de junio"
              value={c.flexible}
              onChange={(e) => set("flexible", e.target.value)}
              aria-invalid={!!errores.cuando}
            />
          </div>
          <p id={`${id}-flex-ayuda`} className="-mt-3 text-sm text-tinta-suave sm:col-span-2">
            Rellena una de las dos (o las dos).
          </p>
          {errores.cuando && <div className="-mt-4 sm:col-span-2">{err("cuando")}</div>}

          <fieldset className="sm:col-span-2">
            <legend className="etiqueta">¿Qué formato te interesa?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {MODALIDADES.map((m) => (
                <label
                  key={m.valor}
                  className={`flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-colors ${c.modalidad === m.valor ? "border-acento bg-acento/5" : "border-linea hover:border-tinta/40"}`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <input
                      type="radio"
                      name={`${id}-modalidad`}
                      value={m.valor}
                      checked={c.modalidad === m.valor}
                      onChange={() => set("modalidad", m.valor)}
                      className="h-4 w-4 accent-[#B4441F]"
                    />
                    {m.etiqueta}
                  </span>
                  <span className="mt-1 text-sm text-tinta-suave">{m.detalle}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {c.modalidad === "medida" && (
            <>
              <fieldset>
                <legend className="etiqueta">¿Dónde?</legend>
                <div className="flex flex-wrap gap-2">
                  {LUGARES.map((l) => (
                    <label key={l.valor} className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 px-4 ${c.lugar === l.valor ? "border-acento bg-acento/5" : "border-linea"}`}>
                      <input type="radio" name={`${id}-lugar`} checked={c.lugar === l.valor} onChange={() => set("lugar", l.valor)} className="h-4 w-4 accent-[#B4441F]" />
                      {l.etiqueta}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="etiqueta">¿Comida o cena?</legend>
                <div className="flex flex-wrap gap-2">
                  {MOMENTOS.map((m) => (
                    <label key={m.valor} className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 px-4 ${c.momento === m.valor ? "border-acento bg-acento/5" : "border-linea"}`}>
                      <input type="radio" name={`${id}-momento`} checked={c.momento === m.valor} onChange={() => set("momento", m.valor)} className="h-4 w-4 accent-[#B4441F]" />
                      {m.etiqueta}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {c.modalidad === "medida" && (
            <fieldset className="sm:col-span-2">
              <legend className="etiqueta">¿Qué te gustaría incluir? <span className="font-normal text-tinta-suave">(opcional)</span></legend>
              <div className="flex flex-wrap gap-2">
                {EXTRAS_MEDIDA.map((x) => {
                  const on = c.extras.includes(x.valor);
                  return (
                    <label key={x.valor} className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 px-4 ${on ? "border-acento bg-acento/5" : "border-linea"}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => set("extras", on ? c.extras.filter((v) => v !== x.valor) : [...c.extras, x.valor])}
                        className="h-4 w-4 accent-[#B4441F]"
                      />
                      {x.etiqueta}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="sm:col-span-2">
            <label htmlFor={`${id}-comentario`} className="etiqueta">Algo más <span className="font-normal text-tinta-suave">(opcional)</span></label>
            <textarea
              id={`${id}-comentario`}
              className="campo min-h-[96px]"
              placeholder="Alergias, si es sorpresa, si queréis tarta…"
              value={c.comentario}
              onChange={(e) => set("comentario", e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn-principal mt-6 w-full sm:w-auto">Preparar mi mensaje de WhatsApp</button>
        <p id={`${id}-nota`} className="mt-3 text-sm text-tinta-suave">
          No se guarda nada en esta web: el mensaje se abre en tu WhatsApp para que lo revises y lo envíes tú. Enviarlo es una consulta, no una reserva confirmada.
        </p>
      </form>

      {listo && (
        <div ref={resultado} tabIndex={-1} className="mt-8 rounded-2xl border-2 border-wa bg-wa/5 p-5 outline-none" aria-live="polite">
          <p className="font-semibold">Tu mensaje está listo. Falta un paso: enviarlo en WhatsApp.</p>
          <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-white p-4 font-sans text-[0.95rem] leading-relaxed">{listo}</pre>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(listo)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion="formulario" data-modalidad={c.modalidad} data-campana={campana}>
              <IconoWhatsapp /> Abrir WhatsApp y enviar
            </a>
            <button type="button" className="btn-linea" onClick={copiar}>
              <IconoCopiar /> {copiado ? "Copiado" : "Copiar mensaje"}
            </button>
          </div>
          <p className="mt-4 text-sm text-tinta-suave">
            ¿No se abre WhatsApp? Copia el mensaje y envíalo al {CONTACTO.telefono}, o llama:{" "}
            <a href={CONTACTO.telefonoHref} className="enlace" data-ubicacion="formulario"><IconoTelefono className="inline h-4 w-4" /> {CONTACTO.telefono}</a>.
            También por email a <a className="enlace" href={`mailto:${CONTACTO.email}?subject=${encodeURIComponent("Consulta de disponibilidad")}&body=${encodeURIComponent(listo)}`}>{CONTACTO.email}</a>.
          </p>
        </div>
      )}
    </div>
  );
}
