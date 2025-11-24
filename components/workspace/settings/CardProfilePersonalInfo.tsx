"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  name: string;
  jobTitle: string;
  company: string;
  country: string;
};

export interface UserProfile {
  _id: Id<"users">;
  authId: string;
  name: string;
  email: string;
  imageUrl?: string;
  pdfDownloadsUsed: number;
  txtDownloadsUsed: number;
  savedDocumentsUsed: number;
  docDownloadsUsed: number;
  jobTitle?: string;
  company?: string;
  country?: string;
  isPro: boolean;
}

export default function CardProfilePersonalInfo({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const updateUserProfile = useMutation(api.users.updateUserProfile);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await updateUserProfile({ ...data, id: userProfile._id });
    if (!result?.ok) toast.error(result?.type + "Failed to update profile");

    toast.success("Profile updated successfully");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="pb-2 md:pb-6">
          <CardTitle className="text-lg md:text-xl">Personal info</CardTitle>
          <CardDescription className="text-sm">
            Update your photo and personal details here.
          </CardDescription>
          <CardAction className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-2 md:pt-4">
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto order-2 sm:order-1"
              onClick={() => {
                if (userProfile) {
                  reset({
                    name: userProfile.name ?? "",
                    jobTitle: userProfile.jobTitle ?? "",
                    company: userProfile.company ?? "",
                    country: userProfile.country ?? "",
                  });
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              Save
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-0">
          {/* Name + Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6 border-t">
            <div className="text-sm font-medium min-w-0 sm:min-w-[120px]">
              Name
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
              <Avatar className="size-10 sm:size-12 shrink-0">
                <AvatarImage
                  alt="Profile avatar"
                  src={userProfile?.imageUrl ?? ""}
                />
                <AvatarFallback>{userProfile?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Input
                  {...register("name", { required: true })}
                  placeholder="Your name"
                  defaultValue={userProfile.name ?? ""}
                  className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-xs" role="alert">
                    Name is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-sm font-medium min-w-0 sm:min-w-[120px]">
              Email address
            </div>
            <div className="w-full min-w-0">
              <Input
                id="email"
                name="email"
                placeholder="you@example.com"
                value={userProfile.email ?? ""}
                disabled
                className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
              />
            </div>
          </div>

          <Separator />

          {/* Job title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-sm font-medium min-w-0 sm:min-w-[120px]">
              Job title
            </div>
            <div className="w-full min-w-0">
              <Input
                {...register("jobTitle", { required: false })}
                placeholder="Job title"
                defaultValue={userProfile.jobTitle ?? ""}
                className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
              />
            </div>
          </div>

          <Separator />

          {/* Company */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-sm font-medium min-w-0 sm:min-w-[120px]">
              Company
            </div>
            <div className="w-full min-w-0">
              <Input
                {...register("company", { required: false })}
                placeholder="Company"
                defaultValue={userProfile.company ?? ""}
                className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
              />
            </div>
          </div>

          <Separator />

          {/* Country */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-sm font-medium min-w-0 sm:min-w-[120px]">
              Country
            </div>
            <div className="w-full min-w-0">
              <Input
                {...register("country", { required: false })}
                placeholder="Country"
                defaultValue={userProfile.country ?? ""}
                className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
              />
            </div>
          </div>

          <input type="submit" hidden />
        </CardContent>
      </form>
    </Card>
  );
}
