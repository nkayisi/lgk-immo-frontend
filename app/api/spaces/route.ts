import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Récupérer tous les espaces disponibles
    const allSpaces = await prisma.space.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    // Récupérer les espaces de l'utilisateur (UserSpace)
    const userSpaces = await prisma.userSpace.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        space: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Get user's activeUserSpaceId from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { activeUserSpaceId: true },
    });

    return NextResponse.json({
      allSpaces,
      userSpaces,
      activeUserSpaceId: user?.activeUserSpaceId,
    });
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { type } = body;

    if (!type || !["public", "locataire", "bailleur", "commissionnaire"].includes(type)) {
      return NextResponse.json(
        { error: "Type d'espace invalide" },
        { status: 400 }
      );
    }

    // Trouver l'espace de référence
    const space = await prisma.space.findUnique({
      where: { type: type },
    });

    if (!space) {
      return NextResponse.json(
        { error: "Type d'espace non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà cet espace
    const existingUserSpace = await prisma.userSpace.findUnique({
      where: {
        userId_spaceId: {
          userId: session.user.id,
          spaceId: space.id,
        },
      },
    });

    if (existingUserSpace) {
      return NextResponse.json(
        { error: "Vous avez déjà cet espace" },
        { status: 400 }
      );
    }

    // Créer l'association UserSpace
    const newUserSpace = await prisma.userSpace.create({
      data: {
        userId: session.user.id,
        spaceId: space.id,
        status: "active",
      },
      include: {
        space: true,
      },
    });

    // Définir comme espace actif
    await prisma.user.update({
      where: { id: session.user.id },
      data: { activeUserSpaceId: newUserSpace.id },
    });

    return NextResponse.json({ userSpace: newUserSpace });
  } catch (error) {
    console.error("Error creating user space:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
