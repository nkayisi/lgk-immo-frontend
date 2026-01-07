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

// Configuration pour l'espace PUBLIC (Particulier)
export const publicSpaceConfig: SpaceConfig = {
  type: "public",
  label: "Public",
  description: "Espace pour les particuliers",
  icon: Home,
  gradient: "from-emerald-500 to-teal-500",
  color: "text-emerald-600",
  bgColor: "bg-emerald-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Tableau de bord",
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

// Configuration pour l'espace OWNER (Propriétaire/Bailleur)
export const ownerSpaceConfig: SpaceConfig = {
  type: "owner",
  label: "Bailleur",
  description: "Espace pour les propriétaires et bailleurs",
  icon: Building,
  gradient: "from-blue-500 to-indigo-500",
  color: "text-blue-600",
  bgColor: "bg-blue-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Tableau de bord",
          href: "/spaces/owner",
          icon: LayoutDashboard,
        },
        {
          label: "Mes biens",
          href: "/spaces/owner/properties",
          icon: Building,
        },
        {
          label: "Statistiques",
          href: "/spaces/owner/analytics",
          icon: BarChart3,
        },
        {
          label: "Messages",
          href: "/spaces/owner/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "GESTION",
      items: [
        {
          label: "Locataires",
          href: "/spaces/owner/tenants",
          icon: Users,
        },
        {
          label: "Paiements",
          href: "/spaces/owner/payments",
          icon: DollarSign,
        },
        {
          label: "Maintenance",
          href: "/spaces/owner/maintenance",
          icon: Wrench,
        },
        {
          label: "Documents",
          href: "/spaces/owner/documents",
          icon: FileText,
        },
      ],
    },
  ],
};

// Configuration pour l'espace RESIDENT (Locataire)
export const residentSpaceConfig: SpaceConfig = {
  type: "resident",
  label: "Locataire",
  description: "Espace pour les locataires",
  icon: Users,
  gradient: "from-purple-500 to-pink-500",
  color: "text-purple-600",
  bgColor: "bg-purple-50",
  menus: [
    {
      title: "COMPTE",
      items: [
        {
          label: "Tableau de bord",
          href: "/spaces/resident",
          icon: LayoutDashboard,
        },
        {
          label: "Mon logement",
          href: "/spaces/resident/housing",
          icon: Home,
        },
        {
          label: "Messages",
          href: "/spaces/resident/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "SERVICES",
      items: [
        {
          label: "Paiements",
          href: "/spaces/resident/payments",
          icon: DollarSign,
        },
        {
          label: "Demandes",
          href: "/spaces/resident/requests",
          icon: ClipboardList,
        },
        {
          label: "Documents",
          href: "/spaces/resident/documents",
          icon: FileText,
        },
      ],
    },
  ],
};

export const spaceConfigs: Record<SpaceTypeEnum, SpaceConfig> = {
  public: publicSpaceConfig,
  owner: ownerSpaceConfig,
  resident: residentSpaceConfig,
};

export function getSpaceConfig(type: SpaceTypeEnum | string): SpaceConfig {
  return spaceConfigs[type as SpaceTypeEnum] || publicSpaceConfig;
}

export function getAvailableSpaceTypes(): SpaceConfig[] {
  return [publicSpaceConfig, ownerSpaceConfig, residentSpaceConfig];
}
