import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#100F10] text-white">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Spray</span>
          <span className="text-[#C879FF]">Can</span>
        </div>
        <nav className="hidden gap-6 text-sm text-[#777777] md:flex">
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Docs</a>
        </nav>
        <a
          href="#"
          className="rounded-md bg-[#FCBA04] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Los geht’s
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Foto → Palette → <span className="text-[#C879FF]">Spraydosen‑Matches</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#777777]">
            Lade ein Bild hoch. Wir extrahieren die Farben und mappen sie auf echte Dosen
            (Montana, Molotow & Co.). Einkaufsliste inklusive.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-md bg-[#FCBA04] px-5 py-3 font-semibold text-black hover:opacity-90"
            >
              Bild hochladen
            </a>
            <a
              href="#"
              className="rounded-md border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/5"
            >
              Demo ansehen
            </a>
          </div>

          {/* Swatches */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { hex: '#100F10', name: 'Base' },
              { hex: '#FFFFFF', name: 'White' },
              { hex: '#777777', name: 'Grey' },
              { hex: '#C879FF', name: 'Accent' },
              { hex: '#FCBA04', name: 'CTA' },
            ].map((c) => (
              <div key={c.hex} className="flex items-center gap-2">
                <span
                  className="inline-block h-6 w-6 rounded"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-sm text-[#777777]">{c.name}</span>
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-white">{c.hex}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup / Platzhalter */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="rounded-xl bg-black/60 p-6">
              <div className="mb-4 text-sm text-[#777777]">Vorschau</div>
              <div className="grid grid-cols-5 gap-2">
                {['#4B4B4B','#C879FF','#FFFFFF','#FCBA04','#777777','#2a2a2a','#100F10','#C879FF','#FFFFFF','#FCBA04'].map((h, i) => (
                  <div key={i} className="h-16 rounded" style={{ backgroundColor: h }} />
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-white/5 p-4">
                <div className="mb-2 text-sm text-[#777777]">Top‑Match (Beispiel)</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded" style={{ backgroundColor: '#C879FF' }} />
                    <div>
                      <div className="font-semibold">Molotow 215 – Neon Violet</div>
                      <div className="text-xs text-[#777777]">ΔE00: 2.8</div>
                    </div>
                  </div>
                  <button className="rounded-md bg-[#FCBA04] px-3 py-2 text-sm font-semibold text-black hover:opacity-90">
                    Zur Liste
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute -inset-10 -z-10 blur-3xl"
               style={{ background: 'radial-gradient(600px circle at 70% 20%, rgba(200,121,255,0.25), transparent 40%), radial-gradient(400px circle at 20% 80%, rgba(252,186,4,0.18), transparent 40%)' }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-[#777777]">
        © {new Date().getFullYear()} SprayCan. Alle Rechte vorbehalten.
      </footer>
    </main>
  );
}