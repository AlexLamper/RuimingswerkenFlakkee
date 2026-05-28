import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-container flex-col items-center px-6 py-24 text-center lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
          Pagina niet gevonden
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy-900 md:text-5xl">
          404
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-steel-700">
          De pagina die u zoekt bestaat niet (meer). Ga terug naar de homepage
          of bekijk onze diensten.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Terug naar home
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center justify-center rounded-sm border border-steel-300 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-steel-50"
          >
            Bekijk diensten
          </Link>
        </div>
      </div>
    </section>
  );
}
