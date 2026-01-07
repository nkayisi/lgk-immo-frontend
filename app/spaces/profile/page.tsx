"use client";

import { useSession } from "@/lib/auth/auth-client";
import { UserType } from "@/lib/types";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) return null;

    const user = session.user as UserType;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Mon profil</h1>
            <p className="text-slate-600 mb-6">Gérez vos informations personnelles</p>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                        <p className="text-slate-600">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                        <Mail className="w-5 h-5 text-slate-400" />
                        <div>
                            <div className="text-sm text-slate-600">Email</div>
                            <div className="font-medium text-slate-900">{user.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                        <User className="w-5 h-5 text-slate-400" />
                        <div>
                            <div className="text-sm text-slate-600">Nom</div>
                            <div className="font-medium text-slate-900">{user.name}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <div>
                            <div className="text-sm text-slate-600">Email vérifié</div>
                            <div className="font-medium text-slate-900">
                                {user.emailVerified ? "Oui" : "Non"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
