export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-3xl rounded-3xl border border-imxGold/40 bg-imxLight px-8 py-12 text-imxDark shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <p className="font-brand text-xs tracking-[0.28em] text-imxRed uppercase">
          IMxplorer Migration - Day 1
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Blank canvas is ready.
        </h1>
        <p className="mt-5 max-w-xl font-sans text-base text-imxDark/80">
          App Router, design tokens, and fonts are wired. Section migration can
          begin from this stable base.
        </p>
      </section>
    </main>
  );
}
