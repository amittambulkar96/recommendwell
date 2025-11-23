"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  FileTextIcon,
  GearIcon,
  SignOutIcon,
  UserCircleGearIcon,
  ListIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { api } from "@/convex/_generated/api";

interface SearchResult {
  id: string;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  score: number;
}

export default function WorkspaceHeader() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const userProfile = useQuery(api.users.getUserProfile);
  const [isSearching, setIsSearching] = useState(false);

  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const search = async () => {
    try {
      setIsSearching(true);
      const res = await fetch(`/api/upstash/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setSearchResults(data || []);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      setSearchResults([
        {
          id: "no-results",
          content: { title: "No results found" },
          metadata: {},
          score: 0,
        },
      ]);
      console.error("Error searching", error);
    } finally {
      setIsSearching(false);
    }
  };

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
              {/* Search */}
              <div className="p-4">
                <div className="relative">
                  <Input
                    className=" w-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm md:placeholder:text-base focus-visible:outline-none"
                    placeholder="Search templates..."
                    type="search"
                    readOnly
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setOpen(true);
                    }}
                  />
                </div>
              </div>

              {/* Profile */}
              {userProfile?.authId ? (
                <div className="border-t">
                  <div className="px-4 py-4 flex items-center gap-3">
                    <Avatar className="rounded-lg">
                      <AvatarImage
                        src={userProfile?.image || ""}
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
        <div className="relative">
          <Input
            className="pe-11 w-64 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm focus-visible:outline-none"
            placeholder="Search templates..."
            type="search"
            readOnly
            onClick={() => setOpen(true)}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
            <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              ⌘K
            </kbd>
          </div>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
          <div className="relative">
            <CommandInput
              value={query}
              onValueChange={setQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  search();
                }
              }}
              placeholder="Search templates..."
            />
            <Button
              variant="outline"
              size="sm"
              onClick={search}
              disabled={isSearching}
              className=" absolute right-12 top-2"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup>
              {searchResults.map((result) => (
                <CommandItem
                  key={result.id}
                  value={String(
                    (result.content as Record<string, unknown>)?.title ??
                      result.id
                  )}
                  onSelect={() => {
                    router.push(`/template/${result.metadata.slug}`);
                    setOpen(false);
                  }}
                >
                  <FileTextIcon size={16} weight="duotone" aria-hidden="true" />

                  {String(
                    (result.content as Record<string, unknown>)?.title ??
                      "Untitled"
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* <Button size="sm" asChild>
          <Link href="/my-letters">
            <NotePencilIcon size={16} weight="duotone" aria-hidden="true" />
            My Letters
          </Link>
        </Button> */}
        {userProfile?.id ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src={userProfile?.image || ""}
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
                    src={userProfile?.image || ""}
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
