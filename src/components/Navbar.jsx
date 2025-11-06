import { Home, Car, Fuel, Phone, LayoutDashboard } from "lucide-react";
import React from "react";

const tabs = [
  { key: "home", label: "Home", icon: Home },
  { key: "aanbod", label: "Aanbod", icon: Car },
  { key: "verkocht", label: "Verkocht", icon: Car },
  { key: "lpg", label: "LPG", icon: Fuel },
  { key: "contact", label: "Contact", icon: Phone },
  { key: "admin", label: "Admin", icon: LayoutDashboard },
];

export default function Navbar({ active, onChange }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
              AD
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-slate-900">AutoDealer</span>
              <span className="text-xs text-slate-500 hidden sm:block">Professioneel & Clean</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active === key
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <select
              value={active}
              onChange={(e) => onChange(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {tabs.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
