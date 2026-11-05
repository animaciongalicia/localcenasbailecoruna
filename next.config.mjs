import { REDIRECCIONES } from "./lib/redirecciones.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Las URLs de WordPress terminan en "/": se mantiene el mismo formato para no crear duplicados.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1440, 1920],
  },
  async redirects() {
    return REDIRECCIONES.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/fotos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] }];
  },
};

export default nextConfig;
