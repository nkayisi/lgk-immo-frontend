import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { PriceDiscoverySection } from "@/components/home/price-discovery-section";
import { SellPropertySection } from "@/components/home/sell-property-section";
import { PartnersSection } from "@/components/home/partners-section";
import { TrustSection } from "@/components/home/trust-section";
import { GuidesSection } from "@/components/home/guides-section";
import { NewsSection } from "@/components/home/news-section";
import { AppDownloadSection } from "@/components/home/app-download-section";
import { CTASection } from "@/components/home/cta-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero + Recherche IA */}
        <HeroSection />

        {/* Découvrez les prix de l'immobilier */}
        <PriceDiscoverySection />

        {/* Vendez vous-même un bien */}
        <SellPropertySection />

        {/* Nos meilleurs partenaires */}
        <PartnersSection />

        {/* Confiance & Certification */}
        <TrustSection />

        {/* Guides et ressources */}
        <GuidesSection />

        {/* Les dernières nouveautés */}
        <NewsSection />

        {/* Téléchargement application */}
        <AppDownloadSection />

        {/* Call to Action */}
        <CTASection />
      </main>

      <Footer />

      {/* Mobile floating CTA */}
        <div className="md:hidden flex sticky bottom-4 z-40 justify-center">
          <Link
            href="/account/properties/new"
            className="max-w-max flex items-center text-sm justify-center gap-2 w-full bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full px-5 py-3 text-white hover:text-slate-50 font-semibold transition-colors shadow-xl shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            Deposer une annonce
          </Link>
        </div>
    </div>
  );
}
