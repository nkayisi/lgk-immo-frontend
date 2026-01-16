"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Shield, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const partners = [
    {
        icon: Landmark,
        title: "Financement immobilier",
        description: "Obtenez un crédit immobilier aux meilleures conditions avec nos banques partenaires.",
        cta: "Simuler un crédit",
        href: "/financing",
        color: "emerald",
    },
    {
        icon: Shield,
        title: "Assurance habitation",
        description: "Protégez votre bien avec nos offres d'assurance adaptées au marché congolais.",
        cta: "Obtenir un devis",
        href: "/insurance",
        color: "cyan",
    },
    {
        icon: Building2,
        title: "Gestion locative",
        description: "Confiez la gestion de votre bien à nos experts pour une tranquillité totale.",
        cta: "En savoir plus",
        href: "/management",
        color: "violet",
    },
    {
        icon: Briefcase,
        title: "Services juridiques",
        description: "Accompagnement juridique complet pour sécuriser vos transactions immobilières.",
        cta: "Consulter",
        href: "/legal",
        color: "amber",
    },
];

const colorClasses = {
    emerald: {
        bg: "bg-emerald-100",
        icon: "text-emerald-600",
        hover: "hover:text-emerald-600",
    },
    cyan: {
        bg: "bg-cyan-100",
        icon: "text-cyan-600",
        hover: "hover:text-cyan-600",
    },
    violet: {
        bg: "bg-violet-100",
        icon: "text-violet-600",
        hover: "hover:text-violet-600",
    },
    amber: {
        bg: "bg-amber-100",
        icon: "text-amber-600",
        hover: "hover:text-amber-600",
    },
};

export function PartnersSection() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
                        Nos meilleurs partenaires pour vos projets
                    </h2>
                    <p className="text-lg text-slate-600">
                        Des services complémentaires pour accompagner votre projet immobilier de A à Z.
                    </p>
                </motion.div>

                {/* Partners Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {partners.map((partner, i) => {
                        const colors = colorClasses[partner.color as keyof typeof colorClasses];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-slate-300 transition-all"
                            >
                                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-5`}>
                                    <partner.icon className={`w-7 h-7 ${colors.icon}`} />
                                </div>

                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {partner.title}
                                </h3>

                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    {partner.description}
                                </p>

                                <Link
                                    href={partner.href}
                                    className={`inline-flex items-center gap-1 text-sm font-medium text-slate-700 ${colors.hover} transition-colors`}
                                >
                                    {partner.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
