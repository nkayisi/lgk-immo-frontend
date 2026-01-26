"use client";

import { MapPin } from "lucide-react";

export function SearchMap() {
  return (
    <div className="h-full bg-slate-100 hidden lg:block sticky top-[140px]">
      {/* Placeholder for map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Carte interactive</p>
          <p className="text-sm text-slate-500 mt-1">
            Trouvez votre bien sur la carte
          </p>
        </div>
      </div>

      {/* Map markers would go here */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Future: Add interactive map with markers */}
      </div>
    </div>
  );
}
