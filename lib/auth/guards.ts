import { SpaceTypeEnum } from "@/lib/types"

export function requireSpaceType(
  user: {
    activeSpaceId?: string | null
    spaces: { id: string; type: SpaceTypeEnum; status: string }[]
  },
  requiredType: SpaceTypeEnum
) {
  const space = user.spaces.find(
    (s) =>
      s.id === user.activeSpaceId &&
      s.type === requiredType &&
      s.status === "active"
  )

  if (!space) {
    throw new Error("FORBIDDEN_SPACE")
  }

  return space
}
