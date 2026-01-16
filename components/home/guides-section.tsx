"use client";

import { motion } from "framer-motion";
import { BookOpen, Home, Key, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const guides = [
    {
        icon: Home,
        title: "Guide de l'acheteur",
        description: "Tout ce qu'il faut savoir avant d'acheter un bien en RDC",
        href: "/guides/buyer",
        color: "emerald",
    },
    {
        icon: Key,
        title: "Guide du locataire",
        description: "Les étapes clés pour louer en toute sérénité",
        href: "/guides/tenant",
        color: "cyan",
    },
    {
        icon: FileCheck,
        title: "Guide du vendeur",
        description: "Vendez votre bien au meilleur prix",
        href: "/guides/seller",
        color: "violet",
    },
    {
        icon: BookOpen,
        title: "Checklist déménagement",
        description: "Ne rien oublier pour votre déménagement",
        href: "/guides/moving",
        color: "amber",
    },
];

const colorClasses = {
    emerald: {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        icon: "text-emerald-600",
        border: "border-emerald-100",
    },
    cyan: {
        bg: "bg-cyan-50",
        iconBg: "bg-cyan-100",
        icon: "text-cyan-600",
        border: "border-cyan-100",
    },
    violet: {
        bg: "bg-violet-50",
        iconBg: "bg-violet-100",
        icon: "text-violet-600",
        border: "border-violet-100",
    },
    amber: {
        bg: "bg-amber-50",
        iconBg: "bg-amber-100",
        icon: "text-amber-600",
        border: "border-amber-100",
    },
};

export function GuidesSection() {
    return (
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
                        LGK vous soutient dans vos projets
                    </h2>
                    <p className="text-lg text-slate-600">
                        Guides pratiques et ressources pour réussir votre projet immobilier.
                    </p>
                </motion.div>

                {/* Guides Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {guides.map((guide, i) => {
                        const colors = colorClasses[guide.color as keyof typeof colorClasses];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={guide.href}
                                    className={`block ${colors.bg} border ${colors.border} rounded-2xl p-6 hover:shadow-md transition-all group h-full`}
                                >
                                    <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                                        <guide.icon className={`w-6 h-6 ${colors.icon}`} />
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                        {guide.title}
                                    </h3>

                                    <p className="text-sm text-slate-600 mb-4">
                                        {guide.description}
                                    </p>

                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                                        Lire le guide
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
