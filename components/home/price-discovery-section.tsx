"use client";

import { motion } from "framer-motion";
import { TrendingUp, MapPin, ArrowRight, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PriceDiscoverySection() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image côté gauche */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
                                alt="Vue aérienne de Kinshasa"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Badge flottant */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Prix moyen</p>
                                    <p className="text-lg font-bold text-slate-900">$1,250/m²</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contenu côté droit */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:pl-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full mb-6">
                            <BarChart3 className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">Estimation gratuite</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
                            Découvrez les prix de l&apos;immobilier en RDC
                        </h2>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Accédez à notre base de données complète des prix immobiliers à Kinshasa et dans toute la RDC.
                            Estimez la valeur de votre bien ou comparez les prix par quartier.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Prix au m² par quartier actualisés",
                                "Évolution des prix sur 12 mois",
                                "Comparaison entre communes",
                                "Estimation gratuite de votre bien",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    </div>
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/prices"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Consulter les prix
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
