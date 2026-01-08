"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SpaceType, UserSpaceType } from "@/lib/types";

interface SpaceContextType {
    allSpaces: SpaceType[];
    userSpaces: UserSpaceType[];
    activeUserSpace: UserSpaceType | null;
    isLoading: boolean;
    switchSpace: (userSpaceId: string) => Promise<boolean>;
    refreshSpaces: () => Promise<void>;
    createSpace: (type: string) => Promise<UserSpaceType | null>;
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

export function SpaceProvider({ children }: { children: ReactNode }) {
    const [allSpaces, setAllSpaces] = useState<SpaceType[]>([]);
    const [userSpaces, setUserSpaces] = useState<UserSpaceType[]>([]);
    const [activeUserSpace, setActiveUserSpace] = useState<UserSpaceType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSpaces = async () => {
        try {
            const response = await fetch("/api/spaces");

            if (response.ok) {
                const data = await response.json();

                setAllSpaces(data.allSpaces || []);
                setUserSpaces(data.userSpaces || []);

                // Get activeUserSpaceId directly from API response (from database)
                const activeUserSpaceId = data.activeUserSpaceId;
                const active = (data.userSpaces || []).find((us: UserSpaceType) => us.id === activeUserSpaceId);
                setActiveUserSpace(active || data.userSpaces?.[0] || null);
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

    const switchSpace = async (userSpaceId: string): Promise<boolean> => {
        try {
            const response = await fetch("/api/spaces/switch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userSpaceId }),
            });

            if (response.ok) {
                // Update activeUserSpace immediately in context
                const newActiveUserSpace = userSpaces.find((us) => us.id === userSpaceId);
                if (newActiveUserSpace) {
                    setActiveUserSpace(newActiveUserSpace);
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

    const createSpace = async (type: string): Promise<UserSpaceType | null> => {
        try {
            const response = await fetch("/api/spaces", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type }),
            });

            if (response.ok) {
                const data = await response.json();
                await refreshSpaces();
                return data.userSpace;
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
                allSpaces,
                userSpaces,
                activeUserSpace,
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
