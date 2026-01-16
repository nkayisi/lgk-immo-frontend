'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { servicesMenus } from "@/lib/spaces/config";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SericesCollapsible({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    return (
        <Collapsible defaultOpen={false} className="group">
            <div className="mb-6">
                <CollapsibleTrigger className={cn("w-full px-4 mb-3 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors", pathname.includes('services') ? "text-emerald-700" : "")}>
                    {servicesMenus.title}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <ul className="space-y-3.5 px-5">
                        {servicesMenus.items.map((item) => {
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
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}