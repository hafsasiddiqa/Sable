"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "./actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().max(100).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ProfileForm({
  defaultName,
  defaultEmail,
  defaultRole,
}: {
  defaultName: string;
  defaultEmail: string;
  defaultRole: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [savedMessage, setSavedMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: defaultName, role: defaultRole },
  });

  function onSubmit(values: FormValues) {
    setSavedMessage("");
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("role", values.role ?? "");

    startTransition(async () => {
      const result = await updateProfile({ success: false }, formData);
      if (result.success) {
        setSavedMessage("Changes saved.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Full name</label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Email</label>
        <Input defaultValue={defaultEmail} type="email" disabled />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Role</label>
        <Input {...register("role")} />
        {errors.role && (
          <p className="text-xs text-destructive">{errors.role.message}</p>
        )}
      </div>

      <Separator />

      <div className="flex items-center justify-end gap-3">
        {savedMessage && (
          <span className="text-xs text-muted-foreground">{savedMessage}</span>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
