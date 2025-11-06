import React from "react";

function CarCard({ car, onSell, onDelete }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div
        className="aspect-[4/3] bg-cover bg-center"
        style={{ backgroundImage: `url(${car.image})` }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-slate-500">
              {car.year} • {car.km.toLocaleString()} km • {car.fuel}
            </p>
          </div>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
            € {car.price.toLocaleString()}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {onSell && (
            <button
              onClick={() => onSell(car.id)}
              className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
            >
              Markeer verkocht
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(car.id)}
              className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm hover:bg-rose-700"
            >
              Verwijder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarGrid({ cars, emptyLabel = "Geen auto's gevonden", onSell, onDelete }) {
  if (!cars || cars.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">{emptyLabel}</div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onSell={onSell} onDelete={onDelete} />
      ))}
    </div>
  );
}
