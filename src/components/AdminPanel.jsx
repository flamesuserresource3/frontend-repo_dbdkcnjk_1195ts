import React, { useMemo, useState } from "react";

const initialCars = [
  {
    id: "1",
    brand: "BMW",
    model: "3 Serie",
    year: 2019,
    km: 64500,
    fuel: "Benzine",
    price: 23950,
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1b?q=80&w=2069&auto=format&fit=crop",
    sold: false,
    lpg: false,
  },
  {
    id: "2",
    brand: "Audi",
    model: "A4",
    year: 2017,
    km: 89200,
    fuel: "Diesel",
    price: 18900,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop",
    sold: true,
    lpg: false,
  },
  {
    id: "3",
    brand: "Volvo",
    model: "V60",
    year: 2018,
    km: 102300,
    fuel: "LPG",
    price: 16900,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop",
    sold: false,
    lpg: true,
  },
];

export default function AdminPanel({ onDataChange }) {
  const [cars, setCars] = useState(initialCars);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    km: "",
    fuel: "Benzine",
    price: "",
    image: "",
    lpg: false,
  });

  const aanbod = useMemo(() => cars.filter((c) => !c.sold), [cars]);
  const verkocht = useMemo(() => cars.filter((c) => c.sold), [cars]);
  const lpg = useMemo(() => cars.filter((c) => c.lpg && !c.sold), [cars]);

  function resetForm() {
    setForm({ brand: "", model: "", year: "", km: "", fuel: "Benzine", price: "", image: "", lpg: false });
  }

  function addCar(e) {
    e.preventDefault();
    const id = String(Date.now());
    const newCar = {
      id,
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Number(form.year) || new Date().getFullYear(),
      km: Number(form.km) || 0,
      fuel: form.fuel,
      price: Number(form.price) || 0,
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2070&auto=format&fit=crop",
      sold: false,
      lpg: Boolean(form.lpg),
    };
    const next = [newCar, ...cars];
    setCars(next);
    onDataChange?.(next);
    resetForm();
  }

  function markSold(id) {
    const next = cars.map((c) => (c.id === id ? { ...c, sold: true } : c));
    setCars(next);
    onDataChange?.(next);
  }

  function removeCar(id) {
    const next = cars.filter((c) => c.id !== id);
    setCars(next);
    onDataChange?.(next);
  }

  // expose slices to parent via callback on mount and update
  React.useEffect(() => {
    onDataChange?.(cars);
  }, []); // eslint-disable-line

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Voeg een auto toe</h2>
            <form onSubmit={addCar} className="mt-4 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="Merk" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
                <input className="input" placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input className="input" type="number" placeholder="Bouwjaar" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                <input className="input" type="number" placeholder="KM" value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value })} />
                <select className="input" value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
                  <option>Benzine</option>
                  <option>Diesel</option>
                  <option>Hybride</option>
                  <option>Elektrisch</option>
                  <option>LPG</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="input" type="number" placeholder="Prijs" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <input className="input" placeholder="Afbeelding URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.lpg} onChange={(e) => setForm({ ...form, lpg: e.target.checked })} />
                LPG-voertuig
              </label>
              <button className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Toevoegen</button>
            </form>

            <div className="mt-6 text-sm text-slate-500">
              Beheer je voorraad: voeg toe, markeer als verkocht of verwijder.
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Voorraad overzicht</h2>
            <div className="mt-4 space-y-8">
              <Section title="Actief aanbod" items={aanbod} onSell={markSold} onDelete={removeCar} />
              <Section title="Verkocht" items={verkocht} onDelete={removeCar} />
              <Section title="LPG" items={lpg} onSell={markSold} onDelete={removeCar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, items, onSell, onDelete }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-slate-800">{title}</h3>
        <span className="text-xs text-slate-500">{items.length} items</span>
      </div>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-900">
                  {c.brand} {c.model}
                </div>
                <div className="text-xs text-slate-500">€ {c.price.toLocaleString()}</div>
              </div>
              <div className="text-xs text-slate-500">{c.year} • {c.km.toLocaleString()} km • {c.fuel}</div>
              <div className="mt-2 flex gap-2">
                {onSell && !c.sold && (
                  <button onClick={() => onSell(c.id)} className="px-2.5 py-1.5 rounded-md bg-emerald-600 text-white text-xs hover:bg-emerald-700">Verkocht</button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(c.id)} className="px-2.5 py-1.5 rounded-md bg-rose-600 text-white text-xs hover:bg-rose-700">Verwijder</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// small utility input class
const style = document.createElement('style');
style.innerHTML = `.input{ @apply w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 }`;
document.head.appendChild(style);
