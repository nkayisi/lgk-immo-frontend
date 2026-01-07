"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Plus, Loader2 } from "lucide-react";
import { useSpace } from "@/contexts/space-context";
import { getSpaceConfig, getAvailableSpaceTypes } from "@/lib/spaces/config";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";

export function SpaceSwitcher() {
    const { spaces, activeSpace, isLoading, switchSpace } = useSpace();
    const [isOpen, setIsOpen] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();

    const handleSwitch = async (spaceId: string) => {
        if (spaceId === activeSpace?.id || isSwitching) return;

        setIsSwitching(true);
        const success = await switchSpace(spaceId);

        if (success) {
            const newSpace = spaces.find((s) => s.id === spaceId);
            if (newSpace) {
                const config = getSpaceConfig(newSpace.type);
                router.push(config.menus[0]?.items[0]?.href || `/spaces/${newSpace.type}`);
            }
        }

        setIsSwitching(false);
        setIsOpen(false);
    };

    const handleCreateSpace = () => {
        setIsOpen(false);
        router.push("/spaces/create");
    };

    if (isLoading || !activeSpace) {
        return (
            <div className="px-3 py-2.5 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            </div>
        );
    }

    const activeConfig = getSpaceConfig(activeSpace.type);
    const ActiveIcon = activeConfig.icon;
    const availableTypes = getAvailableSpaceTypes();
    const existingTypes = spaces.map((s) => s.type);
    const canCreateMore = availableTypes.some((t) => !existingTypes.includes(t.type));

    return (
        <div className="relative px-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSwitching}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all disabled:opacity-50"
            >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${activeConfig.gradient}`}
                    >
                        <ActiveIcon className="w-5 h-5 text-white" />
                    </div>
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
                                    Mes espaces
                                </div>
                                {spaces.map((space) => {
                                    const isActive = space.id === activeSpace.id;
                                    const config = getSpaceConfig(space.type);
                                    const Icon = config.icon;

                                    return (
                                        <button
                                            key={space.id}
                                            onClick={() => handleSwitch(space.id)}
                                            disabled={isSwitching}
                                            className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all ${isActive
                                                ? `${config.bgColor} ${config.color}`
                                                : "hover:bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="text-sm font-medium truncate">
                                                    {config.label}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <Check className={`w-4 h-4 ${config.color} flex-shrink-0`} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {canCreateMore && (
                                <div className="border-t border-slate-100 p-2">
                                    <button
                                        onClick={handleCreateSpace}
                                        className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                                            <Plus className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                                        </div>
                                        <span className="text-sm font-medium">Nouvel espace</span>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
