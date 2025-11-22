"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    setError(null);
    setIsSigningIn(true);

    try {
      const { data: session, error: signInError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (signInError) {
        throw new Error(signInError.message || "Something went wrong.");
      }

      if (!session?.user) throw new Error("User could not sign in");

      router.push("/workspace");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <section className="bg-linear-to-b from-muted/50 to-background flex min-h-screen px-4 py-16 md:py-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-100 m-auto h-fit w-full"
      >
        <div className="p-6">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bIyggHDs5T8CQo73IEadUzF6phS09Gvj1iLPYX"
                alt="ResignWell logo"
                width={28}
                height={28}
                className="rounded-full"
              />
              <p className="text-lg font-bold">
                Resign <span className="text-primary -ml-1">Well</span>
              </p>
            </Link>
            <h1 className="mt-6 text-balance text-sm font-normal">
              <span className="text-muted-foreground">Welcome back!</span>{" "}
              <span className="text-base md:text-xl font-semibold">
                Sign in to continue
              </span>
            </h1>
          </div>

          <div className="mt-6 space-y-2">
            <Button
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/my-letters",
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
              type="button"
              variant="outline"
              size="default"
              className="w-full relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              <span>Google</span>
            </Button>
          </div>

          <hr className="mb-5 mt-6" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Your email"
                className="ring-foreground/15 border-transparent ring-1 placeholder:text-muted-foreground/50 placeholder:text-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Your password"
                className="ring-foreground/15 border-transparent ring-1 placeholder:text-muted-foreground/50 placeholder:text-sm"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              size="default"
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </div>

        <div className="px-6">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/signup">Sign up</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
