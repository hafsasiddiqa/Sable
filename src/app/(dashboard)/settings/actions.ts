"use server";

import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().max(100).optional(),
});

export type ProfileFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    role?: string[];
  };
};

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { success: false };
  }

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.user.update({
    where: { clerkId: clerkUser.id },
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
    },
  });

  revalidatePath("/settings");
  return { success: true };
}
