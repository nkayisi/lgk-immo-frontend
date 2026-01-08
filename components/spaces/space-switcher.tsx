"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Plus, Loader2 } from "lucide-react";
import { useSpace } from "@/contexts/space-context";
import { getSpaceConfig, getAvailableSpaceTypes } from "@/lib/spaces/config";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import Image from "next/image";
import { getInitials } from "@/utils/utils-functions";

interface SpaceSwitcherProps {
    onAction?: () => void;
}

export function SpaceSwitcher({ onAction }: SpaceSwitcherProps = {}) {
    const { allSpaces, userSpaces, activeUserSpace, isLoading, switchSpace } = useSpace();
    const [isOpen, setIsOpen] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();

    const handleSwitch = async (userSpaceId: string) => {
        if (userSpaceId === activeUserSpace?.id || isSwitching) return;

        setIsSwitching(true);
        const success = await switchSpace(userSpaceId);

        if (success) {
            const newUserSpace = userSpaces.find((us) => us.id === userSpaceId);
            if (newUserSpace) {
                const config = getSpaceConfig(newUserSpace.space.type);
                router.push(config.menus[0]?.items[0]?.href || `/spaces/${newUserSpace.space.type}`);
            }
        }

        setIsSwitching(false);
        setIsOpen(false);
        onAction?.();
    };

    const handleCreateSpace = () => {
        setIsOpen(false);
        router.push("/spaces/create");
        onAction?.();
    };

    if (isLoading || !activeUserSpace) {//
        return (
            // space switcher skeleton
            <div className="relative px-3">
                <div className="flex items-center rounded-md gap-2 border p-2 animate-pulse">
                    <div className="!w-14 h-10 rounded-md bg-slate-200 animate-pulse"></div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full h-4 bg-slate-200 animate-pulse"></div>
                        <div className="w-full h-2 bg-slate-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    const activeConfig = getSpaceConfig(activeUserSpace.space.type);
    const ActiveIcon = activeConfig.icon;

    const handleSpaceClick = (spaceId: string) => {
        // Chercher si l'utilisateur a déjà cet espace
        const existingUserSpace = userSpaces.find((us) => us.spaceId === spaceId);

        if (existingUserSpace) {
            // L'utilisateur a déjà cet espace, on switch dessus
            handleSwitch(existingUserSpace.id);
        } else {
            // L'utilisateur n'a pas cet espace, on redirige vers la création
            const space = allSpaces.find((s) => s.id === spaceId);
            if (space) {
                setIsOpen(false);
                router.push(`/spaces/create?type=${space.type}`);
                onAction?.();
            }
        }
    };

    return (
        <div className="relative px-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSwitching}
                className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all disabled:opacity-50"
            >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {session?.user?.image ? (
                        <Image
                            src={session?.user?.image || ""}
                            alt={session?.user?.name || "Avatar"}
                            width={32}
                            height={32}
                            className="w-10 h-10 rounded-md object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                            {getInitials(session?.user?.name)}
                        </div>
                    )}
                    <div className="text-left min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                            {session?.user?.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                            Espace {activeConfig.label}
                        </div>
                    </div>
                </div>
                {isSwitching ? (
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin flex-shrink-0" />
                ) : (
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-3 right-3 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-2 max-h-80 overflow-y-auto">
                                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5">
                                    Tous les espaces
                                </div>
                                {allSpaces
                                    .sort((a, b) => {
                                        const aHasUserSpace = userSpaces.some((us) => us.spaceId === a.id);
                                        const bHasUserSpace = userSpaces.some((us) => us.spaceId === b.id);

                                        // Espaces souscrits en premier
                                        if (aHasUserSpace && !bHasUserSpace) return -1;
                                        if (!aHasUserSpace && bHasUserSpace) return 1;
                                        return 0;
                                    })
                                    .map((space) => {
                                        const userSpace = userSpaces.find((us) => us.spaceId === space.id);
                                        const isActive = userSpace?.id === activeUserSpace.id;
                                        const spaceConfig = getSpaceConfig(space.type);
                                        const Icon = spaceConfig.icon;

                                        return (
                                            <button
                                                key={space.id}
                                                onClick={() => handleSpaceClick(space.id)}
                                                disabled={isSwitching}
                                                className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all ${isActive
                                                    ? `${spaceConfig.bgColor} ${spaceConfig.color}`
                                                    : userSpace
                                                        ? "hover:bg-slate-50 text-slate-700"
                                                        : "hover:bg-slate-50 text-slate-500"
                                                    }`}
                                            >
                                                <div className="flex-1 text-left min-w-0">
                                                    <div className="text-sm font-medium truncate">
                                                        {space.label}
                                                    </div>
                                                    {!userSpace && (
                                                        <div className="text-xs text-slate-400">
                                                            Cliquez pour créer
                                                        </div>
                                                    )}
                                                </div>
                                                {isActive && (
                                                    <Check className={`w-4 h-4 ${spaceConfig.color} flex-shrink-0`} />
                                                )}
                                                {!userSpace && (
                                                    <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                )}
                                            </button>
                                        );
                                    })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
