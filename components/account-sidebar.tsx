"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SpaceSwitcher } from "@/components/spaces/space-switcher";
import { useSpace } from "@/contexts/space-context";
import { getSpaceConfig } from "@/lib/spaces/config";

export function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const { activeSpace, isLoading } = useSpace();

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const spaceConfig = activeSpace ? getSpaceConfig(activeSpace.type) : null;
    const menus = spaceConfig?.menus || [];

    const settingsSection = {
        title: "PARAMÈTRES",
        items: [
            { label: "Mon profil", href: "/spaces/profile", icon: User },
            { label: "Paramètres", href: "/spaces/settings", icon: Settings },
        ],
    };

    return (
        <aside className="w-64 sticky top-20 min-h-[calc(100vh-5rem)] bg-[#faf8f5] border-r border-slate-200 hidden sm:flex flex-col">
            {/* Space Switcher */}
            <div className="py-4 border-b border-slate-200">
                <SpaceSwitcher />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                {!isLoading && menus.map((section) => (
                    <div key={section.title} className="mb-6">
                        <p className="px-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {section.title}
                        </p>
                        <ul className="space-y-1 px-3">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const active = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                active
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            )}
                                        >
                                            <Icon className="w-5 h-5" />
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
                    <p className="px-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {settingsSection.title}
                    </p>
                    <ul className="space-y-1 px-3">
                        {settingsSection.items.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                            active
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-slate-200">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </aside>
    );
}
