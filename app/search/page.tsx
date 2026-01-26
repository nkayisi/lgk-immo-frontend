"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResults } from "@/components/search/search-results";
import { SearchMap } from "@/components/search/search-map";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    budget: { min: 0, max: 0 },
    rooms: 0,
    surface: { min: 0, max: 0 },
  });

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto">
      <Navbar />
      
      <main className="pt-20">
        {/* Filters Section */}
        <SearchFilters 
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Results Section */}
        <div className="">
          {viewMode === "list" ? (
            <SearchResults filters={filters} />
          ) : (
            <div className="grid lg:grid-cols-2 h-[calc(100vh-200px)]">
              <SearchResults filters={filters} />
              <SearchMap />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
