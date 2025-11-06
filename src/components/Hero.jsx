import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Professionele auto dealer met vertrouwen
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Ontdek een zorgvuldig geselecteerd aanbod, transparante prijzen en
              persoonlijke service. Wij helpen je de juiste auto te vinden,
              inclusief LPG-specialisme en inkoop van je huidige wagen.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#aanbod" className="px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">
                Bekijk aanbod
              </a>
              <a href="#contact" className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                Neem contact op
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-[url('https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
