export default function PaginaLegal({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="contenedor max-w-3xl py-14">
      <h1 className="font-serif text-4xl font-semibold sm:text-5xl">{titulo}</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-tinta-suave [&_a]:font-semibold [&_a]:text-acento [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-tinta [&_strong]:text-tinta [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}
