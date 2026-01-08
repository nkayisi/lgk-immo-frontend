export default function CommissionnairePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Tableau de bord Commissionnaire</h1>
                <p className="text-slate-600 mt-2">
                    Gérez vos mandats, clients et commissions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Mandats actifs</h3>
                    <p className="text-3xl font-bold text-orange-600">0</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Clients</h3>
                    <p className="text-3xl font-bold text-orange-600">0</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Commissions ce mois</h3>
                    <p className="text-3xl font-bold text-orange-600">0 €</p>
                </div>
            </div>
        </div>
    );
}
