import { useSession } from "@/lib/auth/auth-client";
import { getInitials } from "@/utils/utils-functions";
import Image from "next/image";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserMenuAvatar({ setShowUserMenu, isMobileMenu = false }: { setShowUserMenu: (value: boolean) => void, isMobileMenu: boolean }) {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <>
            {
                user ? (

                    <button
                        onClick={() => setShowUserMenu(true)}
                        className={cn("flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:shadow-md transition-all bg-white", !isMobileMenu ? "flex" : "sm:hidden")}
                    >
                        <Menu className="w-5 h-5 text-slate-500 ml-1" />
                        {user?.image ? (
                            <Image
                                src={user?.image}
                                alt={user?.name || "Avatar"}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                                {getInitials(user?.name)}
                            </div>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={() => setShowUserMenu(true)}
                        className={cn("flex items-center gap-2 p-1 rounded-md border border-slate-200 hover:shadow-md transition-all bg-white", !isMobileMenu ? "flex" : "sm:hidden")}
                    >
                        <Menu className="w-8 h-8 text-slate-500" />
                    </button>
                )
            }
        </>
    )
}