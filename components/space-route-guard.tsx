"use client";

import { useSpace } from "@/contexts/space-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function SpaceRouteGuard({ children }: { children: React.ReactNode }) {
    const { activeUserSpace, isLoading } = useSpace();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isLoading || !activeUserSpace) return;

        // Extraire le type d'espace depuis l'URL (ex: /spaces/public/dashboard -> "public")
        const pathParts = pathname.split("/");
        const spaceTypeInUrl = pathParts[2]; // /spaces/[type]/...

        // Pages qui ne nécessitent pas de vérification
        const excludedPaths = ["/spaces/create", "/spaces/profile", "/spaces/settings"];
        const isExcluded = excludedPaths.some(path => pathname.startsWith(path));

        if (isExcluded) return;

        // Si l'URL contient un type d'espace différent de l'espace actif
        if (spaceTypeInUrl && spaceTypeInUrl !== activeUserSpace.space.type) {
            // Rediriger vers la même page mais avec le bon espace
            const correctPath = pathname.replace(
                `/spaces/${spaceTypeInUrl}`,
                `/spaces/${activeUserSpace.space.type}`
            );
            router.replace(correctPath);
        }
    }, [pathname, activeUserSpace, isLoading, router]);

    return <>{children}</>;
}
