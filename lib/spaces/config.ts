import {
  Activity,
  BarChart3,
  Building,
  Calendar,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  User,
  Wrench,
  ClipboardList,
  DollarSign,
} from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
  icon: any;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

import { SpaceTypeEnum } from "@/lib/types";

export interface SpaceConfig {
  type: SpaceTypeEnum;
  label: string;
  description: string;
  icon: any;
  gradient: string;
  color: string;
  bgColor: string;
  menus: MenuSection[];
}


export const settingsSection = {
  title: "PARAMÈTRES",
  items: [
    { label: "Mon profil", href: "/spaces/profile", icon: User },
    { label: "Paramètres", href: "/spaces/settings", icon: Settings },
  ],
};


// Configuration pour l'espace PUBLIC (Particulier)
export const publicSpaceConfig: SpaceConfig = {
  type: "public",
  label: "Public",
  description: "Explorez le marché immobilier, découvrez des propriétés qui correspondent à vos besoins et gérez vos annonces favorites. Cet espace vous permet de rechercher des biens, contacter des propriétaires et suivre vos activités immobilières en toute simplicité.",
  icon: Home,
  gradient: "from-emerald-500 to-teal-500",
  color: "text-emerald-600",
  bgColor: "bg-emerald-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Accueil",
          href: "/spaces/public",
          icon: LayoutDashboard,
        },
        {
          label: "Activités",
          href: "/spaces/public/activities",
          icon: Activity,
        },
        {
          label: "Mes annonces",
          href: "/spaces/public/properties",
          icon: Building,
        },
        {
          label: "Favoris",
          href: "/spaces/public/favorites",
          icon: Heart,
        },
        {
          label: "Messages",
          href: "/spaces/public/messages",
          icon: MessageSquare,
        },
      ],
    },
  ],
};

// Configuration pour l'espace BAILLEUR (Propriétaire)
export const bailleurSpaceConfig: SpaceConfig = {
  type: "bailleur",
  label: "Bailleur",
  description: "Gérez efficacement votre patrimoine immobilier. Suivez vos biens, vos locataires, les paiements de loyers et les demandes de maintenance. Accédez à des statistiques détaillées sur vos revenus locatifs et optimisez la gestion de vos propriétés.",
  icon: Building,
  gradient: "from-blue-500 to-indigo-500",
  color: "text-blue-600",
  bgColor: "bg-blue-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Accueil",
          href: "/spaces/bailleur",
          icon: LayoutDashboard,
        },
        {
          label: "Mes biens",
          href: "/spaces/bailleur/properties",
          icon: Building,
        },
        {
          label: "Statistiques",
          href: "/spaces/bailleur/analytics",
          icon: BarChart3,
        },
        {
          label: "Messages",
          href: "/spaces/bailleur/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "GESTION",
      items: [
        {
          label: "Locataires",
          href: "/spaces/bailleur/tenants",
          icon: Users,
        },
        {
          label: "Paiements",
          href: "/spaces/bailleur/payments",
          icon: DollarSign,
        },
        {
          label: "Maintenance",
          href: "/spaces/bailleur/maintenance",
          icon: Wrench,
        },
        {
          label: "Documents",
          href: "/spaces/bailleur/documents",
          icon: FileText,
        },
      ],
    },
  ],
};

// Configuration pour l'espace LOCATAIRE
export const locataireSpaceConfig: SpaceConfig = {
  type: "locataire",
  label: "Locataire",
  description: "Simplifiez la gestion de votre location. Payez vos loyers en ligne, communiquez avec votre propriétaire, soumettez des demandes de maintenance et accédez à tous vos documents de location en un seul endroit sécurisé.",
  icon: Users,
  gradient: "from-purple-500 to-pink-500",
  color: "text-purple-600",
  bgColor: "bg-purple-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Accueil",
          href: "/spaces/locataire",
          icon: LayoutDashboard,
        },
        {
          label: "Mon logement",
          href: "/spaces/locataire/housing",
          icon: Home,
        },
        {
          label: "Messages",
          href: "/spaces/locataire/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "SERVICES",
      items: [
        {
          label: "Paiements",
          href: "/spaces/locataire/payments",
          icon: DollarSign,
        },
        {
          label: "Demandes",
          href: "/spaces/locataire/requests",
          icon: ClipboardList,
        },
        {
          label: "Documents",
          href: "/spaces/locataire/documents",
          icon: FileText,
        },
      ],
    },
  ],
};

// Configuration pour l'espace COMMISSIONNAIRE
export const commissionnaireSpaceConfig: SpaceConfig = {
  type: "commissionnaire",
  label: "Commissionnaire",
  description: "Développez votre activité d'agent immobilier. Gérez vos mandats, suivez votre portefeuille de biens, communiquez avec vos clients et analysez vos performances commerciales. Optimisez vos commissions et développez votre réseau professionnel.",
  icon: Users,
  gradient: "from-orange-500 to-red-500",
  color: "text-orange-600",
  bgColor: "bg-orange-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Accueil",
          href: "/spaces/commissionnaire",
          icon: LayoutDashboard,
        },
        {
          label: "Mes mandats",
          href: "/spaces/commissionnaire/mandates",
          icon: FileText,
        },
        {
          label: "Portefeuille",
          href: "/spaces/commissionnaire/portfolio",
          icon: Building,
        },
        {
          label: "Messages",
          href: "/spaces/commissionnaire/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "GESTION",
      items: [
        {
          label: "Clients",
          href: "/spaces/commissionnaire/clients",
          icon: Users,
        },
        {
          label: "Commissions",
          href: "/spaces/commissionnaire/commissions",
          icon: DollarSign,
        },
        {
          label: "Statistiques",
          href: "/spaces/commissionnaire/analytics",
          icon: BarChart3,
        },
      ],
    },
  ],
};

export const spaceConfigs: Record<SpaceTypeEnum, SpaceConfig> = {
  public: publicSpaceConfig,
  locataire: locataireSpaceConfig,
  bailleur: bailleurSpaceConfig,
  commissionnaire: commissionnaireSpaceConfig,
};

export function getSpaceConfig(type: SpaceTypeEnum | string): SpaceConfig {
  return spaceConfigs[type as SpaceTypeEnum] || publicSpaceConfig;
}

export function getAvailableSpaceTypes(): SpaceConfig[] {
  return [publicSpaceConfig, locataireSpaceConfig, bailleurSpaceConfig, commissionnaireSpaceConfig];
}
