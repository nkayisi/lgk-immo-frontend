"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useSpace } from "@/contexts/space-context";
import { getAvailableSpaceTypes, getSpaceConfig } from "@/lib/spaces/config";

function CreateSpaceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');
    const { allSpaces, userSpaces, createSpace } = useSpace();
    const [selectedType, setSelectedType] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const existingSpaceIds = userSpaces.map((us) => us.spaceId);
    const availableSpaces = allSpaces.filter(
        (space) => !existingSpaceIds.includes(space.id)
    );

    // Si un type est passé en paramètre, on le pré-sélectionne
    useEffect(() => {
        if (typeParam && availableSpaces.some(s => s.type === typeParam)) {
            setSelectedType(typeParam);
        }
    }, [typeParam, availableSpaces]);

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

    if (availableSpaces.length === 0) {
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

    // Si un type est passé en paramètre, on affiche uniquement cet espace
    const spaceToCreate = typeParam ? availableSpaces.find(s => s.type === typeParam) : null;
    const spaceConfig = spaceToCreate ? getSpaceConfig(spaceToCreate.type) : null;

    return (
        <div className="max-w-3xl mx-auto">
            <Link
                href="/spaces/public"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Retour
            </Link>

            {spaceToCreate && spaceConfig ? (
                // Affichage détaillé pour un espace spécifique
                <div className="mb-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${spaceConfig.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <spaceConfig.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Espace {spaceToCreate.label}
                            </h1>
                            <p className="text-slate-600">
                                {spaceToCreate.description}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                        <h3 className="font-semibold text-slate-900 mb-3">À propos de cet espace</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {spaceConfig.description}
                        </p>
                    </div>
                </div>
            ) : (
                // Affichage liste pour sélection multiple
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        Créer un autre nouvel espace
                    </h1>
                    <p className="text-slate-600">
                        Sélectionnez le type d'espace que vous souhaitez créer
                    </p>
                </div>
            )}

            {/* Space Cards */}
            {!spaceToCreate && (
                <div className="space-y-3 mb-6">
                    {availableSpaces.map((space) => {
                        const config = getSpaceConfig(space.type);
                        const Icon = config.icon;
                        const isSelected = selectedType === space.type;

                        return (
                            <button
                                key={space.id}
                                onClick={() => setSelectedType(space.type)}
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
                                        {space.label}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        {space.description}
                                    </p>
                                </div>

                                {isSelected && (
                                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

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
                    className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Création en cours...
                        </>
                    ) : (
                        <>
                            <Check className="w-5 h-5" />
                            Créer l'espace {spaceToCreate?.label}
                        </>
                    )}
                </button>
                <Link
                    href="/spaces/public"
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-colors text-center"
                >
                    Annuler
                </Link>
            </div>
        </div>
    );
}

export default function CreateSpacePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        }>
            <CreateSpaceContent />
        </Suspense>
    );
}
