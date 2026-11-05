"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACTO } from "@/lib/sitio";
import { track } from "@/lib/tracking";
import { whatsappUrl } from "@/lib/whatsapp";
import { EVENTO_ELEGIR_NOCHE, OTRA_FECHA, enFrase, type Noche } from "@/lib/navidad";
import { IconoCopiar, IconoTelefono, IconoWhatsapp } from "./Iconos";

type Errores = Partial<Record<"nombre" | "noche" | "otra" | "personas", string>>;

/** Consulta de Navidad: elige noche y se prepara el WhatsApp. No guarda datos ni confirma reservas. */
export default function FormularioNavidad({ noches, campana, variante }: { noches: Noche[]; campana: string; variante: string }) {
  const id = useId();
  const [nombre, setNombre] = useState("");
  const [noche, setNoche] = useState("");
  const [otra, setOtra] = useState("");
  const [personas, setPersonas] = useState("");
  const [comentario, setComentario] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [listo, setListo] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const abierto = useRef(false);
  const resultado = useRef<HTMLDivElement>(null);

  const tocar = () => {
    setListo(null);
    if (!abierto.current) {
      abierto.current = true;
      track("consulta_abierta", { campana, celebracion: "navidad" });
    }
  };

  // Los botones de cada fecha (BotonNoche) preseleccionan la noche.
  useEffect(() => {
    const elegir = (e: Event) => {
      setNoche((e as CustomEvent<string>).detail);
      setListo(null);
    };
    window.addEventListener(EVENTO_ELEGIR_NOCHE, elegir);
    return () => window.removeEventListener(EVENTO_ELEGIR_NOCHE, elegir);
  }, []);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(personas);
    const errs: Errores = {};
    if (!nombre.trim()) errs.nombre = "Escribe tu nombre (y la empresa o el grupo, si quieres).";
    if (!noche) errs.noche = "Elige una noche o «Otra fecha».";
    if (noche === OTRA_FECHA && !otra.trim()) errs.otra = "¿Qué día os vendría bien?";
    if (!personas || !Number.isFinite(n) || n < 2) errs.personas = "¿Cuántos seréis, más o menos? (desde 2)";
    setErrores(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const sel = noches.find((f) => f.fecha === noche);
    const yo = `Hola, soy ${nombre.trim()}.`;
    let texto =
      noche === OTRA_FECHA
        ? `${yo} Nos interesa una cena de Navidad para ${n} personas en otra fecha: ${otra.trim()}. ¿Tenéis disponibilidad?`
        : sel?.tipo === "a-demanda"
          ? `${yo} Queremos apuntarnos al ${enFrase(sel.etiqueta)} (se abre si se juntan grupos) para ${n} personas.`
          : `${yo} Queremos consultar mesa para ${n} personas en la cena de Navidad del ${enFrase(sel?.etiqueta || "")}. ¿Hay hueco?`;
    if (comentario.trim()) texto += `\n${comentario.trim()}`;
    setListo(texto);
    setCopiado(false);
    track("consulta_validada", { campana, celebracion: "navidad", modalidad: sel?.tipo ?? "otra" });
    requestAnimationFrame(() => resultado.current?.focus());
  };

  const err = (k: keyof Errores) => (errores[k] ? <p id={`${id}-${k}-error`} className="mt-2 text-sm font-medium text-acento">{errores[k]}</p> : null);
  const confirmadas = noches.filter((f) => f.tipo === "confirmada");
  const aDemanda = noches.filter((f) => f.tipo === "a-demanda");

  return (
    <div className="tarjeta p-5 text-tinta sm:p-8">
      <form onSubmit={enviar} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-nombre`} className="etiqueta">Tu nombre <span className="font-normal text-tinta-suave">(y empresa o grupo, si quieres)</span></label>
            <input id={`${id}-nombre`} className="campo" autoComplete="name" value={nombre} onChange={(e) => { setNombre(e.target.value); tocar(); }} aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined} />
            {err("nombre")}
          </div>
          <div>
            <label htmlFor={`${id}-noche`} className="etiqueta">Noche</label>
            <select id={`${id}-noche`} className="campo" value={noche} onChange={(e) => { setNoche(e.target.value); tocar(); }} aria-invalid={!!errores.noche} aria-describedby={errores.noche ? `${id}-noche-error` : undefined}>
              <option value="">Elige una noche…</option>
              {confirmadas.length > 0 && (
                <optgroup label="Noches confirmadas">
                  {confirmadas.map((f) => (
                    <option key={f.fecha} value={f.fecha} disabled={f.completa}>{f.etiqueta}{f.nota ? ` · ${f.nota}` : ""}{f.completa ? " (completa)" : ""}</option>
                  ))}
                </optgroup>
              )}
              {aDemanda.length > 0 && (
                <optgroup label="Se abren si se juntan grupos">
                  {aDemanda.map((f) => (
                    <option key={f.fecha} value={f.fecha} disabled={f.completa}>{f.etiqueta}{f.completa ? " (completa)" : ""}</option>
                  ))}
                </optgroup>
              )}
              <option value={OTRA_FECHA}>Otra fecha…</option>
            </select>
            {err("noche")}
          </div>
          <div>
            <label htmlFor={`${id}-personas`} className="etiqueta">Personas (aprox.)</label>
            <input id={`${id}-personas`} className="campo" type="number" inputMode="numeric" min={2} placeholder="Ej.: 12" value={personas} onChange={(e) => { setPersonas(e.target.value); tocar(); }} aria-invalid={!!errores.personas} aria-describedby={errores.personas ? `${id}-personas-error` : undefined} />
            {err("personas")}
          </div>
          {noche === OTRA_FECHA && (
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-otra`} className="etiqueta">¿Qué día os vendría bien?</label>
              <input id={`${id}-otra`} className="campo" placeholder="Ej.: jueves 17 de diciembre, comida" value={otra} onChange={(e) => { setOtra(e.target.value); tocar(); }} aria-invalid={!!errores.otra} aria-describedby={errores.otra ? `${id}-otra-error` : undefined} />
              {err("otra")}
            </div>
          )}
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-comentario`} className="etiqueta">Algo más <span className="font-normal text-tinta-suave">(opcional)</span></label>
            <input id={`${id}-comentario`} className="campo" placeholder="Alergias, si es cena de empresa con factura…" value={comentario} onChange={(e) => { setComentario(e.target.value); tocar(); }} />
          </div>
        </div>
        <button type="submit" className="btn-principal mt-6 w-full sm:w-auto">Preparar mi mensaje de WhatsApp</button>
        <p className="mt-3 text-sm text-tinta-suave">No se guarda nada en esta web. Se abre tu WhatsApp con el mensaje escrito: lo revisas y lo envías tú. Enviarlo es una consulta; la mesa queda reservada al pagar la señal.</p>
      </form>

      {listo && (
        <div ref={resultado} tabIndex={-1} className="mt-8 rounded-2xl border-2 border-wa bg-wa/5 p-5 outline-none" aria-live="polite">
          <p className="font-semibold">Tu mensaje está listo. Falta un paso: enviarlo en WhatsApp.</p>
          <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-white p-4 font-sans text-[0.95rem] leading-relaxed">{listo}</pre>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(listo)} className="btn-wa" target="_blank" rel="noopener" data-ubicacion={`formulario-navidad-${variante}`} data-campana={campana}>
              <IconoWhatsapp /> Abrir WhatsApp y enviar
            </a>
            <button type="button" className="btn-linea" onClick={async () => { try { await navigator.clipboard.writeText(listo); setCopiado(true); } catch {} }}>
              <IconoCopiar /> {copiado ? "Copiado" : "Copiar mensaje"}
            </button>
          </div>
          <p className="mt-4 text-sm text-tinta-suave">
            ¿No se abre? Envíalo al {CONTACTO.telefono} o llama: <a href={CONTACTO.telefonoHref} className="enlace" data-ubicacion="formulario-navidad"><IconoTelefono className="inline h-4 w-4" /> {CONTACTO.telefono}</a>.
          </p>
        </div>
      )}
    </div>
  );
}
