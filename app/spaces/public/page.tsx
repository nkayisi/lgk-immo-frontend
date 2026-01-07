"use client";

import { Building, Eye, Heart, TrendingUp } from "lucide-react";

export default function PublicDashboardPage() {
    const stats = [
        {
            label: "Total annonces",
            value: "3",
            icon: Building,
            color: "text-slate-900",
            bgColor: "bg-slate-50",
        },
        {
            label: "Actives",
            value: "2",
            icon: TrendingUp,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            label: "Vues totales",
            value: "435",
            icon: Eye,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            label: "Favoris",
            value: "18",
            icon: Heart,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
            <p className="text-slate-600 mb-6">Vue d'ensemble de votre espace particulier</p>

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
