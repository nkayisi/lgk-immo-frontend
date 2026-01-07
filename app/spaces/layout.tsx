"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AccountSidebar } from "@/components/account-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Navbar } from "@/components/navbar";
import { SpaceProvider } from "@/contexts/space-context";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <SpaceProvider>
            <div className="min-h-screen max-w-[1600px] mx-auto bg-[#faf8f5]">
                {/* Navbar principal */}
                <Navbar />

                {/* Spacer pour le navbar fixe */}
                <div className="h-20" />

                {/* Layout avec Sidebar */}
                <div className="flex h-[calc(100vh-5rem)]">
                    {/* Desktop Sidebar */}
                    <AccountSidebar />

                    {/* Contenu principal */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-6xl mx-auto px-6 py-4">{children}</div>
                    </main>
                </div>
            </div>
        </SpaceProvider>
    );
}

