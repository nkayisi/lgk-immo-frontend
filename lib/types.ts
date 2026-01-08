export type SpaceTypeEnum = "public" | "locataire" | "bailleur" | "commissionnaire";

export type SpaceStatusEnum = "active" | "disabled";

export interface SpaceType {
  id: string;
  type: SpaceTypeEnum;
  label: string;
  description: string;
  createdAt: Date;
}

export interface UserSpaceType {
  id: string;
  userId: string;
  spaceId: string;
  status: SpaceStatusEnum;
  space: SpaceType;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  activeUserSpaceId?: string | null;
  activeUserSpace?: UserSpaceType;

  userSpaces?: UserSpaceType[];
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
