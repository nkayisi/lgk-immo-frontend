import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { UserType, SessionType } from "../types";
import { sendVerificationEmail, sendPasswordResetEmail } from "../email";

const prisma = new PrismaClient();
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data: any, request: any) {
      const resetUrl = `${BASE_URL}/reset-password?token=${data.token}`;
      await sendPasswordResetEmail(data.user.email, resetUrl, data.user.name);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail(user.email, url, user.name);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // 1️⃣ Créer ou mettre à jour l'espace PUBLIC
          const publicSpace = await prisma.space.upsert({
            where: {
              userId_type: {
                userId: user.id,
                type: "public",
              },
            },
            update: {},
            create: {
              userId: user.id,
              type: "public",
            },
          });

          // 2️⃣ Définir l'espace actif
          await prisma.user.update({
            where: { id: user.id },
            data: {
              activeSpaceId: publicSpace.id,
            },
          });
        },
      },
    },
  },

  callbacks: {
    async session({ session, user }: { session: SessionType; user: UserType }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          spaces: {
            include: { user: true },
          },
        },
      });

      session.user.activeSpaceId = dbUser?.activeSpaceId;
      // Map database types to match the session type definition
      session.user.spaces = dbUser?.spaces as any;

      return session;
    },
  },
  // Permettre de lier plusieurs providers au même compte (même email)
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook"],
    },
  },
});
