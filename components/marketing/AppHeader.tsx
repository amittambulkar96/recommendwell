"use client";

import * as React from "react";
import Link from "next/link";
import { Poltawski_Nowy } from "next/font/google";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { BookOpenIcon } from "@phosphor-icons/react/dist/csr/BookOpen";
import { CardsThreeIcon } from "@phosphor-icons/react/dist/csr/CardsThree";
import { ClipboardTextIcon } from "@phosphor-icons/react/dist/csr/ClipboardText";
import { FileTextIcon } from "@phosphor-icons/react/dist/csr/FileText";
import { NewspaperIcon } from "@phosphor-icons/react/dist/csr/Newspaper";
import { TagIcon } from "@phosphor-icons/react/dist/csr/Tag";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poltawski-nowy",
});

export default function AppHeader() {
  const { isAuthenticated } = useConvexAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const categoryIndex = useQuery(api.categories.getCategoryIndex);
  const isLoadingCategories = categoryIndex === undefined;
  const featuredCategories = React.useMemo(() => {
    if (!categoryIndex?.length) return [];
    return [...categoryIndex]
      .sort((a, b) => b.totalCount - a.totalCount)
      .slice(0, 2);
  }, [categoryIndex]);

  const featuredItems = featuredCategories.length
    ? featuredCategories.map((category) => ({
        href: `/categories/${category.slug}`,
        title: category.label,
        description: `${category.templateCount} templates | ${category.exampleCount} examples`,
      }))
    : isLoadingCategories
      ? [
          {
            href: "/categories",
            title: "Popular categories",
            description: "Loading category highlights",
          },
          {
            href: "/categories",
            title: "Explore categories",
            description: "Browse all categories",
          },
        ]
      : [];

  return (
    <div className="flex w-full mx-auto max-h-16 h-full max-w-7xl items-center justify-between py-4 px-4 sm:px-6 md:px-10 fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl border-x">
      <Link href="/" className="flex items-center gap-2 min-w-0">
        <Image
          src="https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bIyggHDs5T8CQo73IEadUzF6phS09Gvj1iLPYX"
          alt="ResignWell logo"
          width={28}
          height={28}
          className="rounded-full"
        />
        <p className={`${poltawskiNowy.className} text-lg font-black truncate`}>
          Recommend <span className="text-[#ff6b4a] -ml-1">Well</span>
        </p>
      </Link>
      {/* Desktop navigation */}
      <NavigationMenu className="hidden md:flex" viewport={false}>
        <NavigationMenuList className="flex items-center gap-4 lg:gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[420px] lg:w-[620px] lg:grid-cols-[.55fr_1fr]">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/categories"
                      className="relative flex h-full w-full flex-col justify-end rounded-md p-6 min-h-44 no-underline outline-hidden select-none focus:shadow-md bg-linear-to-br from-primary/20 via-primary/10 to-background"
                    >
                      <div className="absolute inset-0 rounded-md bg-linear-to-br from-muted/20 via-transparent to-transparent" />
                      <div className="relative mt-4 mb-1 text-sm font-semibold">
                        Categories
                      </div>
                      <p className="relative text-muted-foreground text-xs leading-tight">
                        Browse templates and examples by category.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {featuredItems.map((item) => (
                  <ListItem
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    icon={<TagIcon size={32} weight="duotone" />}
                  >
                    {item.description}
                  </ListItem>
                ))}
                <ListItem
                  href="/all-templates"
                  title="View All Templates"
                  icon={<CardsThreeIcon size={32} weight="duotone" />}
                >
                  Browse every recommendation template
                </ListItem>
                <ListItem
                  href="/all-examples"
                  title="View All Examples"
                  icon={<ClipboardTextIcon size={32} weight="duotone" />}
                >
                  Browse every recommendation example
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[600px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-[.5fr_1fr]">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/resources"
                      className="relative flex h-full w-full flex-col justify-end rounded-md p-6 min-h-44 no-underline outline-hidden select-none focus:shadow-md bg-linear-to-br from-primary/20 via-primary/10 to-background"
                    >
                      <div className="absolute inset-0 rounded-md bg-linear-to-br from-muted/20 via-transparent to-transparent" />
                      <div className="relative mt-4 mb-1 text-sm font-semibold">
                        Resources
                      </div>
                      <p className="relative text-muted-foreground text-xs leading-tight">
                        Browse resources to help you write better.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/resources/how-to-write-recommendation-letter"
                  title="How to Write"
                  icon={<BookOpenIcon size={32} weight="duotone" />}
                >
                  How to write a recommendation letter
                </ListItem>
                <ListItem
                  href="/resources/recommendation-letter-topics"
                  title="Recommendation Letter Topics"
                  icon={<FileTextIcon size={32} weight="duotone" />}
                >
                  Browse every recommendation letter topic
                </ListItem>
                <ListItem
                  href="/resources/blog"
                  title="Blog"
                  icon={<NewspaperIcon size={32} weight="duotone" />}
                >
                  Helpful articles for writing better letters
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/pricing">Pricing</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop actions */}
      {!isAuthenticated ? (
        <div className="hidden md:flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          {/* <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button> */}
        </div>
      ) : (
        <div className="hidden md:flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/my-letters">My Letters</Link>
          </Button>
        </div>
      )}

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <ListIcon size={22} weight="bold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Image
                    src="https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bIyggHDs5T8CQo73IEadUzF6phS09Gvj1iLPYX"
                    alt="ResignWell logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className={`${poltawskiNowy.className} font-semibold`}>
                    Resign Well
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
              <div className="flex flex-col gap-2 ">
                <Link
                  href="/categories"
                  className="px-4 py-3  text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                {featuredCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="px-4 py-3 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.label}
                  </Link>
                ))}
                <Link
                  href="/all-templates"
                  className="px-4 py-3 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View All Templates
                </Link>
                <Link
                  href="/all-examples"
                  className="px-4 py-3 border-b text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View All Examples
                </Link>
              </div>
              <div className="flex flex-col gap-2 ">
                <Link
                  href="/resources"
                  className="px-4 py-3  text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/resources/how-to-write-recommendation-letter"
                  className="px-4 py-3  text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How to Write
                </Link>
                <Link
                  href="/resources/recommendation-letter-topics"
                  className="px-4 py-3  text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Recommendation Letter Topics
                </Link>
                <Link
                  href="/resources/blog"
                  className="px-4 py-3 border-b text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
              <Link
                href="/pricing"
                className="px-4 py-3 border-b text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {!isAuthenticated ? (
                <Button variant="outline" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              ) : (
                <Button variant="outline" asChild className="m-4">
                  <Link
                    href="/my-letters"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Letters
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-white rounded-md border border-border p-3 h-full">
              {icon}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm leading-none font-semibold">{title}</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
