"use client";

import { motion } from "framer-motion";
import { Smartphone, Bell, MapPin, Shield, Star } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: Bell,
        title: "Alertes instantanées",
        description: "Soyez notifié dès qu'un bien correspond à vos critères",
    },
    {
        icon: MapPin,
        title: "Recherche géolocalisée",
        description: "Trouvez des biens autour de vous en temps réel",
    },
    {
        icon: Shield,
        title: "Biens certifiés",
        description: "Accédez uniquement à des annonces vérifiées",
    },
];

export function AppDownloadSection() {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-500 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Contenu */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <Smartphone className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white">Application mobile</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
                            LGK, c&apos;est aussi sur mobile
                        </h2>

                        <p className="text-lg text-white/90 mb-8 leading-relaxed">
                            Téléchargez notre application et recherchez votre bien immobilier où que vous soyez.
                            Recevez des alertes personnalisées et ne manquez aucune opportunité.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-0.5">{feature.title}</h3>
                                        <p className="text-sm text-white/80">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Store buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 px-5 py-3 bg-black rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-[10px] text-white/70">Télécharger sur</p>
                                    <p className="text-sm font-semibold text-white">App Store</p>
                                </div>
                            </a>

                            <a
                                href="#"
                                className="inline-flex items-center gap-3 px-5 py-3 bg-black rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-[10px] text-white/70">Disponible sur</p>
                                    <p className="text-sm font-semibold text-white">Google Play</p>
                                </div>
                            </a>
                        </div>

                        {/* Rating */}
                        <div className="mt-6 flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm text-white/90">4.8/5 sur les stores</span>
                        </div>
                    </motion.div>

                    {/* Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-64 sm:w-72">
                            {/* Phone frame */}
                            <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl" />
                                <div className="relative aspect-[9/19] bg-white rounded-[2.5rem] overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"
                                        alt="LGK App"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* App overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">L</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-slate-500">Nouveau bien</p>
                                                    <p className="text-sm font-semibold text-slate-900">Villa à Gombe</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-emerald-600">$450K</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
