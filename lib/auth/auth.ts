import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { UserType, SessionType } from "../types";
import { sendVerificationEmail, sendPasswordResetEmail } from "../email";
import { createAuthMiddleware } from "better-auth/api";

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

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Hook qui se déclenche après la connexion
      if (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/callback")) {
        const newSession = ctx.context.newSession;

        if (newSession?.user) {
          const userId = newSession.user.id;

          // Vérifier si l'utilisateur a au moins un espace
          const userSpaces = await prisma.userSpace.findMany({
            where: { userId },
          });

          if (userSpaces.length === 0) {
            console.log(`⚠️ User ${userId} has no spaces, creating default Public space...`);

            // Récupérer l'espace Public de référence
            const publicSpace = await prisma.space.findUnique({
              where: { type: "public" },
            });

            if (publicSpace) {
              // Créer l'association UserSpace pour l'espace Public
              const userSpace = await prisma.userSpace.create({
                data: {
                  userId,
                  spaceId: publicSpace.id,
                  status: "active",
                },
              });

              // Définir l'espace Public comme espace actif
              await prisma.user.update({
                where: { id: userId },
                data: {
                  activeUserSpaceId: userSpace.id,
                },
              });

              console.log(`✅ Created default Public space for existing user ${userId}`);
            } else {
              console.error("❌ Public space not found in database. Please run seed.");
            }
          }
        }
      }
    }),
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // 1️⃣ Récupérer l'espace Public de référence
          const publicSpace = await prisma.space.findUnique({
            where: { type: "public" },
          });

          if (!publicSpace) {
            console.error("❌ Public space not found in database. Please run seed.");
            return;
          }

          // 2️⃣ Créer l'association UserSpace pour l'espace Public
          const userSpace = await prisma.userSpace.create({
            data: {
              userId: user.id,
              spaceId: publicSpace.id,
              status: "active",
            },
          });

          // 3️⃣ Définir l'espace Public comme espace actif
          await prisma.user.update({
            where: { id: user.id },
            data: {
              activeUserSpaceId: userSpace.id,
            },
          });

          console.log(`✅ Created default Public space for user ${user.id}`);
        },
      },
    },
  },

  callbacks: {
    async session({ session, user }: { session: SessionType; user: UserType }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          userSpaces: {
            include: {
              space: true,
            },
          },
        },
      });

      session.user.activeUserSpaceId = dbUser?.activeUserSpaceId;
      session.user.userSpaces = dbUser?.userSpaces as any;

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
