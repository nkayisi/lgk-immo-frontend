export type SpaceTypeEnum = "public" | "locataire" | "bailleur";

export type SpaceStatusEnum = "active" | "disabled";

export interface SpaceType {
  id: string;
  userId: string;
  type: SpaceTypeEnum;
  status: SpaceStatusEnum;
  user: UserType;
  createdAt: Date;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  activeSpaceId?: string | null;
  activeSpace?: SpaceType;

  spaces?: SpaceType[];
}

export interface SessionType {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  user: UserType;
}
