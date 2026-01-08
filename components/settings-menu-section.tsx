"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { settingsSection } from "@/lib/spaces/config";
import { usePathname } from "next/navigation";

export function SettingsMenuSection() {
    const pathname = usePathname();
    return (
        <div className="my-6">
            <p className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
    )
}