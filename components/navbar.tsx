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
  UserIcon,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { SettingsMenuSection } from "./settings-menu-section";


const basicMenus = [
  {
    path: '/spaces/public',
    label: 'Gérer mes espaces',
    icon: Building2
  },
  {
    path: '/favorite',
    label: 'Favoris',
    icon: Heart
  },
  {
    path: '/properties',
    label: 'Mes annonces',
    icon: Building
  },
  {
    path: '/messages',
    label: 'Messages',
    icon: MessageSquare
  }
]

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
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-200 ${isScrolled
        ? "bg-white/20 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
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
                        {
                          basicMenus.map(item => (
                            <Link
                              key={item.path}
                              href={item.path}
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <item.icon className="w-4 h-4 text-slate-400" />
                              <span>{item.label}</span>
                            </Link>
                          ))
                        }
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Mobile Sidebar - Only in spaces pages where SpaceProvider exists */}
          {isSpacesPage && (
            <MobileSidebar
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Lock body scroll when menu is open */}
      {isMobileMenuOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}

      {/* Simple Mobile Menu for non-spaces pages */}
      <AnimatePresence>
        {isMobileMenuOpen && !isSpacesPage && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed min-h-screen inset-0 z-40 bg-black"
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed flex flex-col min-h-screen inset-y-0 left-0 z-50 bg-[#faf8f5] w-[280px] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="font-semibold text-lg text-slate-900">
                    LGK<span className="text-emerald-500">.</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex flex-col flex-1 justify-between p-3">
                {user ? (
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3 p-2 border mb-5 rounded-lg min-w-0">
                      <Image
                        src={user.image!}
                        alt={user.name || "Avatar"}
                        width={32}
                        height={32}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div className="text-left min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Menu Items */}
                        <div>
                          <p className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            COMPTE
                          </p>
                          <div className="space-y-3.5 px-5">
                            {
                              basicMenus.map(item => (
                                <Link
                                  key={item.path}
                                  href={item.path}
                                  onClick={() => setShowUserMenu(false)}
                                  className="flex items-center gap-3 text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                  <item.icon className="w-4 h-4 text-slate-400" />
                                  <span>{item.label}</span>
                                </Link>
                              ))
                            }
                          </div>
                        </div>

                        {/* Settings Section */}
                        <SettingsMenuSection />
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-200">
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="text-sm font-medium">Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 my-5">
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 text-sm border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 text-sm bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      S&apos;inscrire
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
