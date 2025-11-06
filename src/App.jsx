import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarGrid from "./components/CarGrid";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [active, setActive] = useState("home");
  const [cars, setCars] = useState([]);

  const aanbod = useMemo(() => cars.filter((c) => !c.sold), [cars]);
  const verkocht = useMemo(() => cars.filter((c) => c.sold), [cars]);
  const lpg = useMemo(() => cars.filter((c) => c.lpg && !c.sold), [cars]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar active={active} onChange={setActive} />

      {active === "home" && (
        <main>
          <Hero />
          <section id="aanbod" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold">Uitgelicht aanbod</h2>
            <p className="text-slate-600 mt-1">Een selectie van onze actuele voorraad.</p>
            <div className="mt-6">
              <CarGrid cars={aanbod.slice(0, 6)} emptyLabel="Nog geen auto's in het aanbod" />
            </div>
          </section>

          <section className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold">Waarom kiezen voor ons?</h3>
                <ul className="mt-4 grid sm:grid-cols-2 gap-4 text-slate-700">
                  <li className="p-4 rounded-xl bg-slate-100">Transparante historie en prijzen</li>
                  <li className="p-4 rounded-xl bg-slate-100">Garantie en betrouwbare service</li>
                  <li className="p-4 rounded-xl bg-slate-100">Specialist in LPG-installaties</li>
                  <li className="p-4 rounded-xl bg-slate-100">Inruil en financieringsmogelijkheden</li>
                </ul>
              </div>
              <div id="contact" className="md:col-span-1">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Bel of mail voor een afspraak of proefrit. We staan klaar om te helpen.
                  </p>
                  <div className="mt-4 text-sm">
                    <div className="font-medium">AutoDealer</div>
                    <div>Industrieweg 12, 1234 AB</div>
                    <div>info@autodealer.nl</div>
                    <div>+31 6 1234 5678</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {active === "aanbod" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold">Aanbod</h2>
          <p className="text-slate-600 mt-1">Bekijk alle beschikbare auto's.</p>
          <div className="mt-6">
            <CarGrid cars={aanbod} emptyLabel="Nog geen auto's in het aanbod" />
          </div>
        </section>
      )}

      {active === "verkocht" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold">Verkocht</h2>
          <p className="text-slate-600 mt-1">Recent verkochte auto's.</p>
          <div className="mt-6">
            <CarGrid cars={verkocht} emptyLabel="Nog geen verkochte auto's" />
          </div>
        </section>
      )}

      {active === "lpg" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold">LPG</h2>
          <p className="text-slate-600 mt-1">Ons aanbod met LPG of LPG-ready voertuigen.</p>
          <div className="mt-6">
            <CarGrid cars={lpg} emptyLabel="Momenteel geen LPG-voertuigen beschikbaar" />
          </div>
        </section>
      )}

      {active === "contact" && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold">Neem contact op</h2>
          <p className="text-slate-600 mt-1">We reageren doorgaans binnen één werkdag.</p>
          <form className="mt-6 grid grid-cols-1 gap-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder="Naam" />
              <input className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" type="email" placeholder="E-mail" />
            </div>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder="Telefoon" />
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" rows="5" placeholder="Bericht" />
            <button className="px-5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 w-fit">Verstuur</button>
          </form>
        </section>
      )}

      {active === "admin" && <AdminPanel onDataChange={setCars} />}

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} AutoDealer. Alle rechten voorbehouden.</span>
          <span>Ontwerp: strak en professioneel</span>
        </div>
      </footer>
    </div>
  );
}
