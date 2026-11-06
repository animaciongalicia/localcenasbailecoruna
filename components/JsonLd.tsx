import type { Pregunta } from "@/lib/faq";
import { CONTACTO, LEGAL, MARCA, OFERTAS, SEDE, SITE_URL } from "@/lib/sitio";

// Datos estructurados que reflejan SOLO información real y visible:
// - Los7pc es el ORGANIZADOR, no el propietario del Club Náutico.
// - Sin valoraciones, sin aforos y sin eventos con fechas no confirmadas.

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const ORG_ID = `${SITE_URL}/#organizacion`;

export function JsonLdOrganizacion() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: MARCA.nombre,
        legalName: LEGAL.titular,
        taxID: LEGAL.nif,
        url: `${SITE_URL}/`,
        telephone: CONTACTO.telefono,
        email: CONTACTO.email,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}/fotos/ambiente-baile.jpg`,
        address: { "@type": "PostalAddress", addressLocality: "A Coruña", addressRegion: "Galicia", addressCountry: "ES" },
        areaServed: [{ "@type": "City", name: "A Coruña" }, { "@type": "AdministrativeArea", name: "Galicia" }],
        contactPoint: { "@type": "ContactPoint", telephone: CONTACTO.telefono, email: CONTACTO.email, contactType: "reservations", availableLanguage: ["es", "gl"] },
        knowsAbout: ["cenas baile", "cenas de empresa", "cenas de Navidad", "cumpleaños de adultos", "despedidas", "jubilaciones", "fiestas privadas"],
        description: `${MARCA.trayectoria}. Cenas con show cómico y baile con DJ.`,
        // sameAs: añadir aquí las URLs de Google Business Profile, Instagram y Facebook cuando estén confirmadas.
      }}
    />
  );
}

export function JsonLdServicio() {
  const t = OFERTAS.temporada;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Cena baile con show cómico y DJ en A Coruña",
        serviceType: "Cena con espectáculo y baile para grupos",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: "A Coruña" },
        description: `Cena sentada con bebida durante la cena, show cómico y DJ con baile hasta las 3:00 en el ${SEDE.nombre}.`,
        offers: {
          "@type": "Offer",
          name: `${t.nombre} · temporada ${t.temporada} ${t.anio}`,
          price: t.precio,
          priceCurrency: t.moneda,
          priceSpecification: { "@type": "UnitPriceSpecification", price: t.precio, priceCurrency: t.moneda, referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "persona" }, valueAddedTaxIncluded: t.ivaIncluido },
          validFrom: t.validFrom,
          validThrough: t.validThrough,
          url: `${SITE_URL}/menus-precios/`,
        },
      }}
    />
  );
}

export function JsonLdFaq({ preguntas }: { preguntas: Pregunta[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: preguntas.map((q) => ({ "@type": "Question", name: q.p, acceptedAnswer: { "@type": "Answer", text: q.r } })),
      }}
    />
  );
}

export function JsonLdMigas({ nombre, ruta }: { nombre: string; ruta: string }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: nombre, item: `${SITE_URL}${ruta}` },
        ],
      }}
    />
  );
}
