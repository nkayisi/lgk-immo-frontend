"use client";

import { motion } from "framer-motion";
import { Camera, FileText, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
    {
        icon: Camera,
        title: "Publiez votre annonce",
        description: "Photos, description, prix - créez votre annonce en quelques minutes",
    },
    {
        icon: FileText,
        title: "Certification gratuite",
        description: "Nos experts vérifient et certifient votre bien",
    },
    {
        icon: Users,
        title: "Recevez des contacts",
        description: "Acheteurs qualifiés et accompagnement personnalisé",
    },
];

export function SellPropertySection() {
    return (
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Contenu côté gauche */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 rounded-full mb-6">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm font-medium text-cyan-700">Publication gratuite</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
                            Vendez vous-même un bien immobilier sur LGK
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Publiez votre annonce gratuitement et touchez des milliers d&apos;acheteurs potentiels.
                            Notre équipe vous accompagne à chaque étape.
                        </p>

                        {/* Étapes */}
                        <div className="space-y-6 mb-8">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100">
                                        <step.icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                                        <p className="text-sm text-slate-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Link
                            href="/sell"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                        >
                            Déposer une annonce
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Image côté droit */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                                alt="Vendez votre bien"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Badge flottant */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -left-2 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-cyan-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Acheteurs actifs</p>
                                    <p className="text-lg font-bold text-slate-900">+15,000</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
