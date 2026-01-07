"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, Building, Users, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSpace } from "@/contexts/space-context";
import { getAvailableSpaceTypes, getSpaceConfig } from "@/lib/spaces/config";

const spaceDetails = {
    owner: {
        title: "Espace Propriétaire",
        subtitle: "Gérez vos biens immobiliers",
        description: "Cet espace est conçu pour les propriétaires et bailleurs qui souhaitent gérer leurs biens immobiliers de manière professionnelle.",
        color: "blue"
    },
    resident: {
        title: "Espace Locataire",
        subtitle: "Votre logement en un clic",
        description: "Cet espace est dédié aux locataires pour faciliter la communication avec leur propriétaire et gérer leur logement au quotidien.",
        color: "purple"
    }
};

export default function CreateSpacePage() {
    const router = useRouter();
    const { spaces, createSpace } = useSpace();
    const [selectedType, setSelectedType] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const existingTypes = spaces.map((s) => s.type);
    const availableTypes = getAvailableSpaceTypes().filter(
        (config) => !existingTypes.includes(config.type)
    );

    const handleCreate = async () => {
        if (!selectedType) {
            setError("Veuillez sélectionner un type d'espace");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const newSpace = await createSpace(selectedType);
            if (newSpace) {
                const config = getSpaceConfig(selectedType);
                router.push(config.menus[0]?.items[0]?.href || `/spaces/${selectedType}`);
                window.location.reload();
            } else {
                setError("Impossible de créer l'espace. Vous l'avez peut-être déjà.");
            }
        } catch (err) {
            setError("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    if (availableTypes.length === 0) {
        return (
            <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Tous les espaces créés !
                        </h2>
                        <p className="text-slate-600 mb-8">
                            Vous avez déjà créé tous les types d'espaces disponibles. Utilisez le sélecteur d'espace pour naviguer entre eux.
                        </p>
                        <Link
                            href="/spaces/public"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à mes espaces
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Link
                href="/spaces/public"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Retour
            </Link>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    Créer un nouvel espace
                </h1>
                <p className="text-slate-600">
                    Sélectionnez le type d'espace que vous souhaitez créer
                </p>
            </div>

            {/* Space Cards */}
            <div className="space-y-3 mb-6">
                {availableTypes.map((config) => {
                    const Icon = config.icon;
                    const isSelected = selectedType === config.type;
                    const details = spaceDetails[config.type as keyof typeof spaceDetails];

                    return (
                        <button
                            key={config.type}
                            onClick={() => setSelectedType(config.type)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-start gap-4 ${isSelected
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-slate-900 mb-1">
                                    {details?.title || config.label}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    {details?.description}
                                </p>
                            </div>

                            {isSelected && (
                                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleCreate}
                    disabled={loading || !selectedType}
                    className="flex-1 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Création...
                        </>
                    ) : (
                        "Créer l'espace"
                    )}
                </button>
                <Link
                    href="/spaces/public"
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors text-center"
                >
                    Annuler
                </Link>
            </div>
        </div>
    );
}
