// Iconos de línea fina, en el color del texto. SVG inline: cero peticiones extra.
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconoTelefono = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const IconoWhatsapp = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3a8.2 8.2 0 1 1 6.9 3.9Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

export const IconoEuro = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <circle cx="16" cy="16" r="13" />
    <path d="M20.5 11a6 6 0 1 0 0 10M9 14.5h8M9 17.5h8" />
  </svg>
);

export const IconoCena = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <circle cx="16" cy="17" r="7.5" />
    <circle cx="16" cy="17" r="4.5" />
    <path d="M4 6v6a2 2 0 0 0 2 2v12M6 6v5M8 6v6a2 2 0 0 1-2 2M28 6c-2 1-3 4-3 8h3v12" />
  </svg>
);

export const IconoShow = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <path d="M12 4h8l-1 9a3 3 0 0 1-6 0l-1-9ZM16 16v6M12 28h8M16 22v6" />
    <path d="M24 9l1.2 2.5L28 12l-2 2 .5 2.8L24 15.5l-2.5 1.3.5-2.8-2-2 2.8-.5L24 9Z" />
    <path d="M5 18a4 4 0 0 1 6 0M3 15a7 7 0 0 1 10 0" />
  </svg>
);

export const IconoBaile = ({ className = "h-9 w-9" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <circle cx="16" cy="13" r="8" />
    <path d="M8 13h16M16 5v16M10 8.5c2 1.3 4 2 6 2s4-.7 6-2M10 17.5c2-1.3 4-2 6-2s4 .7 6 2M16 21v3M12 28h8" />
  </svg>
);

export const IconoCerrar = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconoFlecha = ({ className = "h-6 w-6", izquierda = false }: P & { izquierda?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d={izquierda ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

export const IconoMas = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.6}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconoMenu = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconoAbajo = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconoUbicacion = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.6}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const IconoCopiar = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const IconoMail = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
