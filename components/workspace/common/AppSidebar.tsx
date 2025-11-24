"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import {
  BookOpenIcon,
  CardsThreeIcon,
  FilePlusIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Template type based on Prisma schema
interface Template {
  id: string;
  name: string;
  description: string;
  slug: string;
  content: Record<string, unknown>;
  tags: string[];
  isPro: boolean;
  previewImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Navigation data with icon metadata so we can reuse consistently across the app
interface NavLinkItem {
  title: string;
  url: string;
  icon?: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavLinkItem[];
}

const data: { navMain: NavSection[] } = {
  navMain: [
    {
      title: "Workspace",
      items: [
        {
          title: "My Letters",
          url: "/my-letters",
          icon: NotePencilIcon,
        },
        {
          title: "Blank Letter",
          url: "/template/blank",
          icon: FilePlusIcon,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: CardsThreeIcon,
        },
        {
          title: "Resources",
          url: "/resources",
          icon: BookOpenIcon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu className="px-2 py-3">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="hover:bg-transparent active:bg-transparent"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bIyggHDs5T8CQo73IEadUzF6phS09Gvj1iLPYX"
                  alt="ResignWell logo"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <p className="text-lg font-bold">
                  Recommend <span className="text-primary -ml-1">Well</span>
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <React.Fragment key={item.title}>
            <SidebarGroup>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((link) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton asChild isActive={isActive(link.url)}>
                        <Link
                          href={link.url}
                          className="flex items-center gap-2"
                        >
                          {link.icon ? (
                            <link.icon weight="duotone" size={18} />
                          ) : null}
                          <span>{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </React.Fragment>
        ))}

        <Separator className="mt-1" />

        {/* <SidebarGroup>
          <SidebarGroupLabel>All Templates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isPending ? (
                // Loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 flex-1 rounded" />
                    </div>
                  </SidebarMenuItem>
                ))
              ) : isError ? (
                // Error state
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Failed to load templates</span>
                  </div>
                </SidebarMenuItem>
              ) : templates && templates.length > 0 ? (
                // Success state with templates
                templates.map((template: Template) => (
                  <SidebarMenuItem key={template.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(`/template/${template.slug}`)}
                    >
                      <Link
                        href={`/template/${template.slug}`}
                        className="flex items-center gap-2"
                      >
                        <FileTextIcon weight="duotone" className="h-4 w-4" />
                        <span className="truncate max-w-[70%]">
                          {template.name}
                        </span>
                        {template.isPro && (
                          <Badge
                            variant="pro"
                            className="ml-auto px-1.5 py-0.3 text-[0.6rem]"
                          >
                            Pro
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                // Empty state
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>No templates available</span>
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarProUpgradeCard />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function SidebarProUpgradeCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const result = useQuery(api.users.getUserProfile);
  const userProfile = result?.ok ? result.data : null;

  return (
    <>
      {userProfile?.isPro ? null : (
        <Card className="relative overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-emerald-950 via-blue-950 to-purple-950 py-4 px-1 text-white shadow-lg">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background:radial-gradient(55%_60%_at_0%_0%,white_0,transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-10 [background:radial-gradient(45%_55%_at_100%_0%,white_0,transparent_60%)]" />
          <CardHeader className="px-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ring-1 ring-white/30">
                Pro
              </span>
              <span className="text-xs text-white/80">
                Limited-time upgrade
              </span>
            </div>
            <CardTitle className="text-sm leading-tight">
              Unlock the full toolkit
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              AI assistant, premium templates, and doc exports.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <Button
              size="sm"
              className="w-full bg-white/15 text-white hover:bg-white/20"
              onClick={() => setIsDialogOpen(true)}
            >
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}

      {/* <DialogProUpgrade
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        session={session}
        isLoading={isLoading}
        proStatus={proStatus}
      /> */}
    </>
  );
}
