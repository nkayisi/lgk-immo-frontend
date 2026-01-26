"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Home, Building2, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

const marketData = [
  {
    city: "Kinshasa",
    district: "Gombe",
    avgPrice: 2500,
    priceChange: 5.2,
    avgRent: 1800,
    rentChange: 3.8,
    properties: 234,
    icon: Building2,
  },
  {
    city: "Kinshasa",
    district: "Ngaliema",
    avgPrice: 1800,
    priceChange: -2.1,
    avgRent: 1200,
    rentChange: 1.5,
    properties: 189,
    icon: Home,
  },
  {
    city: "Kinshasa",
    district: "Limete",
    avgPrice: 1500,
    priceChange: 4.3,
    avgRent: 950,
    rentChange: 2.9,
    properties: 312,
    icon: Building2,
  },
  {
    city: "Kinshasa",
    district: "Ma Campagne",
    avgPrice: 1200,
    priceChange: 3.7,
    avgRent: 800,
    rentChange: 4.2,
    properties: 156,
    icon: Home,
  },
];

const stats = [
  {
    label: "Prix moyen/m²",
    value: "$1,850",
    change: "+3.5%",
    trend: "up",
  },
  {
    label: "Loyer moyen/mois",
    value: "$1,200",
    change: "+2.8%",
    trend: "up",
  },
  {
    label: "Temps de vente moyen",
    value: "45 jours",
    change: "-5 jours",
    trend: "down",
  },
  {
    label: "Taux d'occupation",
    value: "92%",
    change: "+1.2%",
    trend: "up",
  },
];

export function BarometerSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Données actualisées
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Baromètre Immobilier
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Suivez l'évolution du marché immobilier à Kinshasa en temps réel
          </p>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {stat.value}
              </p>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-sm font-semibold text-emerald-600">
                  {stat.change}
                </span>
                <span className="text-xs text-slate-500">vs mois dernier</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Data by District */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Prix par quartier
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Janvier 2026</span>
            </div>
          </div>

          <div className="space-y-4">
            {marketData.map((data, index) => {
              const Icon = data.icon;
              return (
                <motion.div
                  key={data.district}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Location */}
                    <div className="flex items-center gap-3 md:w-1/4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{data.district}</p>
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {data.city}
                        </p>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Avg Price */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Prix moyen/m²</p>
                        <p className="text-lg font-bold text-slate-900">
                          ${data.avgPrice}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {data.priceChange > 0 ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-semibold ${
                              data.priceChange > 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {data.priceChange > 0 ? "+" : ""}
                            {data.priceChange}%
                          </span>
                        </div>
                      </div>

                      {/* Avg Rent */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Loyer moyen/mois</p>
                        <p className="text-lg font-bold text-slate-900">
                          ${data.avgRent}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          <span className="text-xs font-semibold text-emerald-600">
                            +{data.rentChange}%
                          </span>
                        </div>
                      </div>

                      {/* Properties Count */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Biens disponibles</p>
                        <p className="text-lg font-bold text-slate-900">
                          {data.properties}
                        </p>
                        <Link
                          href={`/search?location=${data.district}`}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-1 inline-block"
                        >
                          Voir les annonces →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  Besoin d'une estimation personnalisée ?
                </p>
                <p className="text-sm text-slate-600">
                  Obtenez une évaluation gratuite de votre bien en quelques minutes
                </p>
              </div>
              <Link
                href="/estimate"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
              >
                Estimer mon bien
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
