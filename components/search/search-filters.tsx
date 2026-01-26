"use client";

import { MapPin, SlidersHorizontal, List, Map, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  filters: {
    location: string;
    propertyType: string;
    budget: { min: number; max: number };
    rooms: number;
    surface: { min: number; max: number };
  };
  setFilters: (filters: any) => void;
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
}

export function SearchFilters({ filters, setFilters, viewMode, setViewMode }: SearchFiltersProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-[1920px] mx-auto px-4 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Location Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {filters.location || "Paris, Ile-de-France"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4">
              <input
                type="text"
                placeholder="Saisir un lieu"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Property Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
                <span className="text-sm font-medium text-slate-700">
                  {filters.propertyType || "Louer Appartement ou maison"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setFilters({ ...filters, propertyType: "Appartement" })}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm"
                >
                  Appartement
                </button>
                <button
                  onClick={() => setFilters({ ...filters, propertyType: "Maison" })}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm"
                >
                  Maison
                </button>
                <button
                  onClick={() => setFilters({ ...filters, propertyType: "Terrain" })}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm"
                >
                  Terrain
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Budget Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
                <span className="text-sm font-medium text-slate-700">Budget</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Min</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.budget.min || ""}
                    onChange={(e) => setFilters({ ...filters, budget: { ...filters.budget, min: Number(e.target.value) } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Max</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.budget.max || ""}
                    onChange={(e) => setFilters({ ...filters, budget: { ...filters.budget, max: Number(e.target.value) } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rooms Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
                <span className="text-sm font-medium text-slate-700">Pièces</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, "6+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFilters({ ...filters, rooms: typeof num === "number" ? num : 6 })}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      filters.rooms === num
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Surface Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
                <span className="text-sm font-medium text-slate-700">Surfaces</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Min (m²)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.surface.min || ""}
                    onChange={(e) => setFilters({ ...filters, surface: { ...filters.surface, min: Number(e.target.value) } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Max (m²)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.surface.max || ""}
                    onChange={(e) => setFilters({ ...filters, surface: { ...filters.surface, max: Number(e.target.value) } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Filters */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Filtres</span>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Save Search Button */}
          <button className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium">
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">Sauvegarder la recherche</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === "list"
                  ? "bg-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">Liste</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                viewMode === "map"
                  ? "bg-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="text-sm font-medium">Carte</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
