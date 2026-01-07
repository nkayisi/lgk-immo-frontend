import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      activeSpaceId: string | null;
      spaces: {
        id: string;
        type: "public" | "locataire" | "bailleur";
        status: "active" | "disabled";
      }[];
    } & DefaultSession["user"];
  }
}
