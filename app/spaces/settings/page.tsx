"use client";

import { Bell, Lock, Globe } from "lucide-react";

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Paramètres</h1>
            <p className="text-slate-600 mb-6">Configurez votre compte</p>

            <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-5 h-5 text-slate-600" />
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-slate-700">Recevoir des emails pour les nouveaux messages</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-slate-700">Recevoir des emails pour les nouvelles vues</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-5 h-5 text-slate-600" />
                        <h3 className="font-semibold text-slate-900">Sécurité</h3>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                        Changer le mot de passe
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-5 h-5 text-slate-600" />
                        <h3 className="font-semibold text-slate-900">Langue</h3>
                    </div>
                    <select className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option>Français</option>
                        <option>English</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
