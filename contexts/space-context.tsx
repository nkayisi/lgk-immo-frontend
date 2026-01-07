"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SpaceType } from "@/lib/types";

interface SpaceContextType {
    spaces: SpaceType[];
    activeSpace: SpaceType | null;
    isLoading: boolean;
    switchSpace: (spaceId: string) => Promise<boolean>;
    refreshSpaces: () => Promise<void>;
    createSpace: (type: string) => Promise<SpaceType | null>;
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

// Map app types to database types
function mapAppTypeToDbType(appType: string): string {
    const mapping: Record<string, string> = {
        public: "public",
        owner: "bailleur",
        resident: "locataire",
    };
    return mapping[appType] || appType;
}

// Map database types to app types
function mapDbTypeToAppType(dbType: string): string {
    const mapping: Record<string, string> = {
        public: "public",
        bailleur: "owner",
        locataire: "resident",
    };
    return mapping[dbType] || dbType;
}

export function SpaceProvider({ children }: { children: ReactNode }) {
    const [spaces, setSpaces] = useState<SpaceType[]>([]);
    const [activeSpace, setActiveSpace] = useState<SpaceType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSpaces = async () => {
        try {
            const response = await fetch("/api/spaces");

            if (response.ok) {
                const data = await response.json();

                // Map database types to app types
                const mappedSpaces = (data.spaces || []).map((space: any) => ({
                    ...space,
                    type: mapDbTypeToAppType(space.type)
                }));

                setSpaces(mappedSpaces);

                // Get activeSpaceId directly from API response (from database)
                const activeSpaceId = data.activeSpaceId;
                const active = mappedSpaces.find((s: SpaceType) => s.id === activeSpaceId);
                setActiveSpace(active || mappedSpaces[0] || null);
            }
        } catch (error) {
            console.error("Error fetching spaces:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    const switchSpace = async (spaceId: string): Promise<boolean> => {
        try {
            const response = await fetch("/api/spaces/switch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ spaceId }),
            });

            if (response.ok) {
                // Update activeSpace immediately in context
                const newActiveSpace = spaces.find((s) => s.id === spaceId);
                if (newActiveSpace) {
                    setActiveSpace(newActiveSpace);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error switching space:", error);
            return false;
        }
    };

    const refreshSpaces = async () => {
        await fetchSpaces();
    };

    const createSpace = async (type: string): Promise<SpaceType | null> => {
        try {
            const dbType = mapAppTypeToDbType(type);

            const response = await fetch("/api/spaces", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: dbType }),
            });

            if (response.ok) {
                const data = await response.json();
                await refreshSpaces();
                return data.space;
            }
            return null;
        } catch (error) {
            console.error("Error creating space:", error);
            return null;
        }
    };

    return (
        <SpaceContext.Provider
            value={{
                spaces,
                activeSpace,
                isLoading,
                switchSpace,
                refreshSpaces,
                createSpace,
            }}
        >
            {children}
        </SpaceContext.Provider>
    );
}

export function useSpace() {
    const context = useContext(SpaceContext);
    if (context === undefined) {
        throw new Error("useSpace must be used within a SpaceProvider");
    }
    return context;
}
