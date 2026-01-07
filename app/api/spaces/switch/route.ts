import { auth } from "@/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma/client";

export async function POST(req: Request) {
  const session = await auth.api.getSession(req);
  const { spaceId } = await req.json();

  const prisma = new PrismaClient();

  const space = await prisma.space.findFirst({
    where: {
      id: spaceId,
      userId: session?.user?.id,
      status: "active",
    },
  });

  if (!space) {
    return new Response("Forbidden", { status: 403 });
  }

  await prisma.user.update({
    where: { id: session?.user?.id },
    data: {
      activeSpaceId: spaceId,
    },
  });

  return Response.json({ success: true });
}
