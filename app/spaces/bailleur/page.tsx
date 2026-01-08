"use client";

import { Building, DollarSign, Users, Wrench } from "lucide-react";

export default function OwnerDashboardPage() {
  const stats = [
    {
      label: "Biens",
      value: "5",
      icon: Building,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Locataires",
      value: "8",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Revenus mensuels",
      value: "3 500 USD",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Demandes maintenance",
      value: "2",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
      <p className="text-slate-600 mb-6">Vue d'ensemble de votre espace propriétaire</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
