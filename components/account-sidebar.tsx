"use client";

import { SpaceSwitcher } from "@/components/spaces/space-switcher";
import { useSpace } from "@/contexts/space-context";
import { signOut } from "@/lib/auth/auth-client";
import { getSpaceConfig } from "@/lib/spaces/config";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuSkeleton } from "./menu-skeleton";
import { SericesCollapsible } from "./serices-collapsible";
import { SettingsMenuSection } from "./settings-menu-section";

export function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { activeUserSpace, isLoading } = useSpace();

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const spaceConfig = activeUserSpace ? getSpaceConfig(activeUserSpace.space.type) : null;
    const menus = spaceConfig?.menus || [];


    return (
        <aside className="w-68 sticky top-20 min-h-[calc(100vh-5rem)] bg-[#faf8f5] border-r border-slate-200 hidden sm:flex flex-col">
            {/* Space Switcher */}
            <div className="py-4 border-b border-slate-200">
                <SpaceSwitcher />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                {isLoading ? (
                    <MenuSkeleton />
                ) : (
                    <>
                        {menus.map((section) => (
                            <div key={section.title} className="mb-6">
                                <p className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                        <SettingsMenuSection />


                        <SericesCollapsible />

                    </>
                )}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-slate-200">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 text-red-600 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </aside>
    );
}
