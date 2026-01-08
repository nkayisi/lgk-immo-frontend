import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { userSpaceId } = await request.json();
    const prisma = new PrismaClient();

    // Vérifier que le UserSpace appartient bien à l'utilisateur
    const userSpace = await prisma.userSpace.findFirst({
      where: {
        id: userSpaceId,
        userId: session.user.id,
        status: "active",
      },
      include: {
        space: true,
      },
    });

    if (!userSpace) {
      return NextResponse.json({ error: "Espace non trouvé" }, { status: 403 });
    }

    // Mettre à jour l'espace actif de l'utilisateur
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        activeUserSpaceId: userSpaceId,
      },
    });

    console.log(
      `✅ Space switched to ${userSpace.space.type} (${userSpaceId}) for user ${session.user.id}`
    );

    return NextResponse.json({
      success: true,
      userSpaceId,
      spaceType: userSpace.space.type
    });
  } catch (error) {
    console.error("Error switching space:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
