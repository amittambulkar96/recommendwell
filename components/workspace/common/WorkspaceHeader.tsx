"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import {
  GearIcon,
  ListIcon,
  SignOutIcon,
  UserCircleGearIcon,
} from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkspaceHeader() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const result = useQuery(api.users.getUserProfile);
  const userProfile = result?.ok ? result.data : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden lg:block">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden lg:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Workspace</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden lg:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {(() => {
                const segments = pathname.split("/").filter(Boolean);
                const last = segments[segments.length - 1] || "";
                const isEditorDoc = segments[0] === "editor" && last.length > 0;
                if (isEditorDoc) {
                  return last.length > 6 ? `#${last.slice(-6)}` : "Document";
                }
                return last
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              })()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Mobile hamburger */}
      <div className="ml-auto lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <ListIcon size={22} weight="bold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 z-99">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Workspace</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
              {/* Profile */}
              {userProfile?.authId ? (
                <div className="border-t">
                  <div className="px-4 py-4 flex items-center gap-3">
                    <Avatar className="rounded-lg">
                      <AvatarImage
                        src={userProfile?.imageUrl || ""}
                        alt={userProfile?.name?.charAt(0)}
                      />
                      <AvatarFallback>
                        {userProfile?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {userProfile?.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {userProfile?.email}
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-col border-t">
                    <Link
                      href="/profile"
                      className="px-4 py-3 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="px-4 py-3 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="px-4 py-3 text-left text-sm"
                      disabled={isLoggingOut}
                      onClick={async () => {
                        try {
                          setIsLoggingOut(true);
                          await authClient.signOut();
                          setIsLoggingOut(false);
                          setIsMobileMenuOpen(false);
                          router.push("/");
                        } catch (error) {
                          console.error(error);
                          setIsLoggingOut(false);
                        }
                      }}
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </nav>
                </div>
              ) : (
                <div className="border-t p-4">
                  <Button className="w-full" asChild>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right side actions */}
      <div className="ml-auto hidden lg:flex gap-2">
        {userProfile?.authId ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src={userProfile?.imageUrl || ""}
                    alt={userProfile?.name?.charAt(0)}
                  />
                  <AvatarFallback>
                    {userProfile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="border-background absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 bg-emerald-500">
                  <span className="sr-only">Online</span>
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64 z-70">
              <DropdownMenuLabel className="flex min-w-0 gap-2 items-center">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src={userProfile?.imageUrl || ""}
                    alt={userProfile?.name?.charAt(0)}
                  />
                  <AvatarFallback>
                    {userProfile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground truncate text-sm font-medium">
                    {userProfile?.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-normal">
                    {userProfile?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserCircleGearIcon
                      size={16}
                      className="opacity-60"
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <GearIcon
                      size={16}
                      className="opacity-60"
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isLoggingOut}
                onClick={async () => {
                  try {
                    setIsLoggingOut(true);
                    await authClient.signOut();
                    setIsLoggingOut(false);
                    router.push("/");
                  } catch (error) {
                    console.error(error);
                    setIsLoggingOut(false);
                  }
                }}
              >
                <SignOutIcon size={16} weight="duotone" aria-hidden="true" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
