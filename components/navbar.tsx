"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { UserMenuAvatar } from "./user-menu-avatar";
import { SpaceSwitcher } from "./spaces/space-switcher";


const basicMenus = [
  {
    path: '/spaces/profile',
    label: 'Mon profil',
    icon: User
  },
  {
    path: '/spaces/settings',
    label: 'Paramètres',
    icon: Settings
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

  // Check if we're in spaces pages - don't show mobile menu there
  const isSpacesPage = pathname?.startsWith('/spaces');

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-200 ${isScrolled
        ? "bg-white/20 backdrop-blur-xl"
        : "backdrop-blur-xl bg-white/20"
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
                <UserMenuAvatar isMobileMenu={false} setShowUserMenu={setShowUserMenu} />

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-68 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >

                      {/* Space Switcher */}
                      <div className="py-3 border-b border-slate-100">
                        <SpaceSwitcher isPushable={true} />
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

                      <div className="border-t border-slate-100 py-2 mt-5">
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
          <UserMenuAvatar isMobileMenu={true} setShowUserMenu={setIsMobileMenuOpen} />

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

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
    </motion.nav>
  );
}
