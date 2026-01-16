"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { servicesMenus } from "@/lib/spaces/config";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronRight,
  Key,
  MapPin,
  Search,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FeaturedProperties } from "./featured-properties";

// Actions principales (style Airbnb - sans Vendre)
const actions = [
  {
    id: "rent",
    label: "Louer",
    icon: Key,
    description: "Trouvez votre location",
  },
  {
    id: "buy",
    label: "Acheter",
    icon: ShoppingBag,
    description: "Devenez propriétaire",
  },
];


// Biens immobiliers (données fictives)
const properties = [
  {
    id: "1",
    title: "Villa Moderne avec Piscine",
    type: "house",
    location: "Gombe, Kinshasa",
    price: 450000,
    pricePerMonth: 3500,
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    isForRent: true,
    isForSale: true,
    isNew: true,
    isVerified: true,
  },
  {
    id: "2",
    title: "Appartement Vue Fleuve",
    type: "apartment",
    location: "Ngaliema, Kinshasa",
    price: 180000,
    pricePerMonth: 1200,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    isForRent: true,
    isForSale: false,
    isNew: false,
    isVerified: true,
  },
  {
    id: "3",
    title: "Maison Familiale Sécurisée",
    type: "house",
    location: "Ma Campagne, Kinshasa",
    price: 320000,
    pricePerMonth: 2200,
    bedrooms: 5,
    bathrooms: 3,
    area: 280,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    isForRent: false,
    isForSale: true,
    isNew: true,
    isVerified: true,
  },
  {
    id: "4",
    title: "Studio Moderne Centre-ville",
    type: "apartment",
    location: "Gombe, Kinshasa",
    price: 75000,
    pricePerMonth: 600,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    isForRent: true,
    isForSale: true,
    isNew: false,
    isVerified: true,
  },
  {
    id: "5",
    title: "Terrain Constructible",
    type: "land",
    location: "Limete, Kinshasa",
    price: 95000,
    pricePerMonth: null,
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    isForRent: false,
    isForSale: true,
    isNew: true,
    isVerified: true,
  },
  {
    id: "6",
    title: "Penthouse de Luxe",
    type: "apartment",
    location: "Gombe, Kinshasa",
    price: 550000,
    pricePerMonth: 4500,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    isForRent: true,
    isForSale: true,
    isNew: false,
    isVerified: true,
  },
];

export function HeroSection() {
  const [activeAction, setActiveAction] = useState("rent");

  const [propertyType, setPropertyType] = useState<string>("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showBedroomsDropdown, setShowBedroomsDropdown] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
        setShowTypeDropdown(false);
        setShowBedroomsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer les autres dropdowns quand on en ouvre un
  const openDropdown = (dropdown: "location" | "type" | "bedrooms") => {
    setShowLocationDropdown(
      dropdown === "location" ? !showLocationDropdown : false
    );
    setShowTypeDropdown(dropdown === "type" ? !showTypeDropdown : false);
    setShowBedroomsDropdown(
      dropdown === "bedrooms" ? !showBedroomsDropdown : false
    );
  };

  // Détermine si on doit afficher les options de chambres
  const showBedroomsOption =
    propertyType === "house" || propertyType === "apartment";

  // Filtrer les biens selon l'action sélectionnée
  const filteredProperties = properties.filter((property) => {
    if (activeAction === "rent") {
      return property.isForRent;
    } else if (activeAction === "buy") {
      return property.isForSale;
    }
    return true;
  });

  // Titre dynamique selon l'action
  const getTitle = () => {
    switch (activeAction) {
      case "buy":
        return "Achetez";
      case "rent":
        return "Louez";
      case "sell":
        return "Vendez";
      default:
        return "Trouvez";
    }
  };

  const getSubtitle = () => {
    switch (activeAction) {
      case "buy":
        return "Trouvez le bien de vos rêves parmi nos propriétés certifiées";
      case "rent":
        return "Découvrez des locations vérifiées et sécurisées";
      case "sell":
        return "Vendez votre bien et trouvez un acheteur";
      default:
        return "Biens certifiés, vérification légale incluse";
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex flex-col justify-center overflow-hidden"
      >
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/70" />
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"

        >
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeAction}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600"
                >
                  {getTitle()}
                </motion.span>
              </AnimatePresence>{" "}
              votre bien
            </h1>
            <motion.p
              key={activeAction + "-subtitle"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-slate-700 font-medium max-w-xl mx-auto drop-shadow-sm"
            >
              {getSubtitle()}
            </motion.p>
          </motion.div>

          {/* Module de recherche */}
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative md:max-w-3xl w-full mx-auto"
          >
            {/* Container principal */}
            <Tabs defaultValue="rent" value={activeAction} onValueChange={(value) => {
              setActiveAction(value);
              setPropertyType("");
            }} className="bg-white rounded-3xl shadow-2xl md:min-w-2xl w-full overflow-hidden">
              {/* Tabs horizontaux */}
              <TabsList className="flex-1 bg-white border-0 overflow-x-auto">
                <TabsTrigger value="buy" className="flex-1 p-2 pt-3 text-base flex-col gap-2 md:flex-row md:gap-2">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Acheter</span>
                </TabsTrigger>
                <TabsTrigger value="rent" className="flex-1 p-2 pt-3 text-base flex-col gap-2 md:flex-row md:gap-2">
                  <Key className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Louer</span>
                </TabsTrigger>
                <TabsTrigger value="sell" className="flex-1 p-2 pt-3 text-base flex-col gap-2 md:flex-row md:gap-2">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Vendre</span>
                </TabsTrigger>
              </TabsList>

              {/* Champ de recherche */}
              <TabsContent value="buy" className="m-0 px-5 pb-5 pt-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Saisir le lieu ou le code postal"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-4 text-base text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-md shadow-emerald-500/20">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="rent" className="m-0 px-5 pb-5 pt-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Saisir le lieu ou le code postal"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="w-full pl-12 pr-3 py-3 text-base text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-md shadow-emerald-500/20">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="m-0 px-5 pb-5 pt-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Saisir le lieu ou le code postal"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-4 text-base text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-md shadow-emerald-500/20">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

      </section>

      {/* Section Services */}
      <section className="relative -mt-8 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-slate-200 py-4 px-6"
          >
            <div className="flex flex-col sm:flex-row tems-center justify-between gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">

              {
                servicesMenus.items.map(item => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className="group flex items-center gap-3 py-3 sm:py-0 sm:px-6 w-full sm:w-auto sm:justify-center hover:opacity-80 transition-opacity"
                  >
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex w-full items-center gap-3 justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-cyan-500 uppercase tracking-wide">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-cyan-500" />
                    </div>
                  </Link>
                ))
              }

            </div>
          </motion.div>
        </div>
      </section>

      {/* Section offres du moment */}
      <FeaturedProperties />
    </>
  );
}
