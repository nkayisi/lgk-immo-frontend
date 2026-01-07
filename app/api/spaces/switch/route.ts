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

    const { spaceId } = await request.json();
    const prisma = new PrismaClient();

    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
        userId: session.user.id,
        status: "active",
      },
    });

    if (!space) {
      return NextResponse.json({ error: "Espace non trouvé" }, { status: 403 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        activeSpaceId: spaceId,
      },
    });

    console.log(
      `✅ Space switched to ${space.type} (${spaceId}) for user ${session.user.id}`
    );

    return NextResponse.json({ success: true, spaceId, spaceType: space.type });
  } catch (error) {
    console.error("Error switching space:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
