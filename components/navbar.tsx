"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Building,
  Building2,
  Globe,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu utilisateur quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push("/");
  };

  // Obtenir les initiales de l'utilisateur
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Check if we're in spaces pages - don't show mobile menu there
  const isSpacesPage = pathname?.startsWith('/spaces');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-200 ${isScrolled
        ? "bg-white/20 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-semibold text-xl text-slate-900">
              LGK<span className="text-emerald-500">.</span>
            </span>
          </Link>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">

            {/* Ajouter un bien */}
            <Link
              href="/account/properties/new"
              className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Deposer une annonce
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-200" />

            {/* Language */}
            <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">FR</span>
            </button>

            {/* Auth - Conditionnel */}
            {isPending ? (
              // Loading state
              <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
            ) : user ? (
              // Utilisateur connecté - Menu avatar
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:shadow-md transition-all bg-white"
                >
                  <Menu className="w-4 h-4 text-slate-500 ml-1" />
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Avatar"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-medium text-slate-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/spaces/public"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span>Gérer mes espaces</span>
                        </Link>
                        <Link
                          href="/account"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span>Favoris</span>
                        </Link>
                        <Link
                          href="/account/properties"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Building className="w-4 h-4 text-slate-400" />
                          <span>Mes annonces</span>
                        </Link>
                        <Link
                          href="/account/messages"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span>Messages</span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 py-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Utilisateur non connecté - Boutons auth
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors"
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Hidden in spaces pages */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Menu className="w-7 h-7" />
            </button>

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* Lock body scroll when menu is open */}
      {isOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}

    </motion.nav>
  );
}
