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

    const spaces = await prisma.space.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Get user's activeSpaceId from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { activeSpaceId: true },
    });

    return NextResponse.json({
      spaces,
      activeSpaceId: user?.activeSpaceId,
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

    if (!type || !["public", "locataire", "bailleur"].includes(type)) {
      return NextResponse.json(
        { error: "Type d'espace invalide" },
        { status: 400 }
      );
    }

    // Check if user already has this type of space
    const existingSpace = await prisma.space.findFirst({
      where: {
        userId: session.user.id,
        type: type,
      },
    });

    if (existingSpace) {
      return NextResponse.json(
        { error: "Vous avez déjà un espace de ce type" },
        { status: 400 }
      );
    }

    // Create new space
    const newSpace = await prisma.space.create({
      data: {
        userId: session.user.id,
        type: type,
        status: "active",
      },
    });

    // Set as active space
    await prisma.user.update({
      where: { id: session.user.id },
      data: { activeSpaceId: newSpace.id },
    });

    return NextResponse.json({ space: newSpace });
  } catch (error) {
    console.error("Error creating space:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
