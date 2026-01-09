"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { LogOut, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SpaceSwitcher } from "@/components/spaces/space-switcher";
import { useSpace } from "@/contexts/space-context";
import { getSpaceConfig } from "@/lib/spaces/config";
import { AnimatePresence, motion } from "framer-motion";
import { MenuSkeleton } from "./menu-skeleton";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const { activeUserSpace, isLoading } = useSpace();

    const handleSignOut = async () => {
        await signOut();
        onClose();
        router.push("/");
    };

    const spaceConfig = activeUserSpace ? getSpaceConfig(activeUserSpace.space.type) : null;
    const menus = spaceConfig?.menus || [];

    const settingsSection = {
        title: "PARAMÈTRES",
        items: [
            { label: "Mon profil", href: "/spaces/profile", icon: User },
            { label: "Paramètres", href: "/spaces/settings", icon: Settings },
        ],
    };

    return (
        <>
            {/* Lock body scroll when menu is open */}
            {isOpen && (
                <style jsx global>{`
                    body {
                        overflow: hidden;
                    }
                `}</style>
            )}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-50 bg-black md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: "-100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 bg-[#faf8f5] w-[280px] shadow-2xl md:hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200">
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                                        <span className="text-white font-bold text-sm">L</span>
                                    </div>
                                    <span className="font-semibold text-lg text-slate-900">
                                        LGK<span className="text-emerald-500">.</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {
                                session?.user ? (
                                    <>
                                        <div className="flex flex-col flex-1">
                                            {/* Space Switcher */}
                                            <div className="py-4 border-b border-slate-200">
                                                <SpaceSwitcher onAction={onClose} />
                                            </div>

                                            {/* Navigation - Scrollable */}
                                            <nav className="flex-1 overflow-y-auto py-4">
                                                {isLoading ? (
                                                    <MenuSkeleton />
                                                ) : (
                                                    <>
                                                        {menus.map((section) => (
                                                            <div key={section.title} className="mb-6">
                                                                <p className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                                    {section.title}
                                                                </p>
                                                                <ul className="space-y-3.5 px-5">
                                                                    {section.items.map((item) => {
                                                                        const Icon = item.icon;
                                                                        const active = pathname === item.href;
                                                                        return (
                                                                            <li key={item.href}>
                                                                                <Link
                                                                                    href={item.href}
                                                                                    onClick={onClose}
                                                                                    className={cn(
                                                                                        "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                                                                                        active
                                                                                            ? "text-emerald-700"
                                                                                            : "text-slate-600 hover:text-slate-900"
                                                                                    )}
                                                                                >
                                                                                    <Icon className="w-4 h-4" />
                                                                                    {item.label}
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        ))}

                                                        {/* Settings Section */}
                                                        <div className="mb-6">
                                                            <p className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                                {settingsSection.title}
                                                            </p>
                                                            <ul className="space-y-3.5 px-5">
                                                                {settingsSection.items.map((item) => {
                                                                    const Icon = item.icon;
                                                                    const active = pathname === item.href;
                                                                    return (
                                                                        <li key={item.href}>
                                                                            <Link
                                                                                href={item.href}
                                                                                onClick={onClose}
                                                                                className={cn(
                                                                                    "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                                                                                    active
                                                                                        ? "text-emerald-700"
                                                                                        : "text-slate-600 hover:text-slate-900"
                                                                                )}
                                                                            >
                                                                                <Icon className="w-4 h-4" />
                                                                                {item.label}
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                )}
                                            </nav>

                                            {/* Bottom Actions */}
                                            <div className="p-3 border-t border-slate-200">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full flex items-center gap-3 px-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Déconnexion
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="px-4">
                                        <div className="space-y-4 my-5">
                                            <Link
                                                href="/sign-in"
                                                // onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-center w-full py-2.5 text-sm border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                                            >
                                                Connexion
                                            </Link>
                                            <Link
                                                href="/sign-up"
                                                // onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-center w-full py-2.5 text-sm bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                                            >
                                                S&apos;inscrire
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
