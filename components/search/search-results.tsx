"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchResultsProps {
  filters: {
    location: string;
    propertyType: string;
    budget: { min: number; max: number };
    rooms: number;
    surface: { min: number; max: number };
  };
}

const mockProperties = [
  {
    id: "1",
    title: "Villa Moderne avec Piscine",
    type: "Maison",
    location: "Gombe, Kinshasa",
    price: 450000,
    pricePerMonth: 3500,
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    isForRent: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Appartement Vue Fleuve",
    type: "Appartement",
    location: "Ngaliema, Kinshasa",
    price: 180000,
    pricePerMonth: 1200,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    isForRent: true,
    isNew: false,
  },
  {
    id: "3",
    title: "Maison Familiale Sécurisée",
    type: "Maison",
    location: "Ma Campagne, Kinshasa",
    price: 320000,
    pricePerMonth: 2200,
    bedrooms: 5,
    bathrooms: 3,
    area: 280,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    isForRent: false,
    isNew: true,
  },
  {
    id: "4",
    title: "Studio Moderne Centre-ville",
    type: "Appartement",
    location: "Gombe, Kinshasa",
    price: 75000,
    pricePerMonth: 600,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    isForRent: true,
    isNew: false,
  },
  {
    id: "5",
    title: "Duplex avec Terrasse",
    type: "Appartement",
    location: "Limete, Kinshasa",
    price: 250000,
    pricePerMonth: 1800,
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    isForRent: true,
    isNew: true,
  },
  {
    id: "6",
    title: "Villa de Luxe Piscine",
    type: "Maison",
    location: "Gombe, Kinshasa",
    price: 850000,
    pricePerMonth: 5500,
    bedrooms: 6,
    bathrooms: 4,
    area: 450,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isForRent: true,
    isNew: true,
  },
];

export function SearchResults({ filters }: SearchResultsProps) {
  const [likedProperties, setLikedProperties] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {mockProperties.length} maisons et appartements à louer - Paris
          </h2>
        </div>

        {/* Properties Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/properties/${property.id}`}>
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {property.isNew && (
                      <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(property.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        likedProperties.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Price */}
                  <div className="mb-2">
                    <p className="text-2xl font-bold text-slate-900">
                      ${property.pricePerMonth.toLocaleString()}
                      <span className="text-sm font-normal text-slate-500">/mois</span>
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-slate-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span className="text-sm">{property.area}m²</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
