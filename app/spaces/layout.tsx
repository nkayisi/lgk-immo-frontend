"use client";

import { AccountSidebar } from "@/components/account-sidebar";
import { Navbar } from "@/components/navbar";
import { SpaceRouteGuard } from "@/components/space-route-guard";
import { SpaceProvider } from "@/contexts/space-context";

export default function AccountLayout({ children }: { children: React.ReactNode }) {

    return (
        <SpaceProvider>
            <SpaceRouteGuard>
                <div className="min-h-screen max-w-[1600px] mx-auto bg-[#faf8f5]">
                    {/* Navbar principal */}
                    <Navbar />

                    {/* Spacer pour le navbar fixe */}
                    <div className="h-18" />

                    {/* Layout avec Sidebar */}
                    <div className="flex h-[calc(100vh-4.5rem)]">
                        {/* Desktop Sidebar */}
                        <AccountSidebar />

                        {/* Contenu principal */}
                        <main className="flex-1 overflow-y-auto">
                            <div className="max-w-6xl mx-auto px-6 py-4">{children}</div>
                        </main>
                    </div>
                </div>
            </SpaceRouteGuard>
        </SpaceProvider>
    );
}

