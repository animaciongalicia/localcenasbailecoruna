import Link from "next/link";

export default function NoEncontrada() {
  return (
    <div className="contenedor max-w-2xl py-20 text-center">
      <p className="antetitulo">Error 404</p>
      <h1 className="titulo-seccion mt-3">Esta página no existe</h1>
      <p className="entradilla mx-auto">Puede que el enlace sea antiguo. La cena, el show y el baile siguen en su sitio.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-principal">Ir al inicio</Link>
        <Link href="/reservas/" className="btn-linea">Consultar disponibilidad</Link>
      </div>
    </div>
  );
}
