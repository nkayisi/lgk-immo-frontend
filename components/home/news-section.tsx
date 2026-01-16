"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const articles = [
    {
        id: 1,
        title: "Les quartiers les plus prisés de Kinshasa en 2024",
        excerpt: "Découvrez les communes qui attirent le plus d'investisseurs immobiliers cette année.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        date: "15 Jan 2024",
        readTime: "5 min",
        category: "Marché",
    },
    {
        id: 2,
        title: "Comment vérifier un titre foncier en RDC",
        excerpt: "Guide complet pour sécuriser votre achat immobilier et éviter les arnaques.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        date: "12 Jan 2024",
        readTime: "8 min",
        category: "Conseils",
    },
    {
        id: 3,
        title: "Investir dans l'immobilier depuis la diaspora",
        excerpt: "Nos conseils pour les Congolais de l'étranger souhaitant investir au pays.",
        image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
        date: "10 Jan 2024",
        readTime: "6 min",
        category: "Diaspora",
    },
    {
        id: 4,
        title: "Évolution des prix immobiliers à Gombe",
        excerpt: "Analyse détaillée du marché immobilier dans le quartier d'affaires de Kinshasa.",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
        date: "8 Jan 2024",
        readTime: "4 min",
        category: "Analyse",
    },
];

export function NewsSection() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-2">
                            Les dernières nouveautés
                        </h2>
                        <p className="text-lg text-slate-600">
                            Actualités et conseils pour votre projet immobilier
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                        Voir tous les articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.map((article, i) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <Link href={`/blog/${article.id}`}>
                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {article.readTime}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-slate-600 line-clamp-2">
                                    {article.excerpt}
                                </p>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Voir tous les articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
