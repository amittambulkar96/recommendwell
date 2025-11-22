"use client";

import * as React from "react";
import Link from "next/link";

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
import { BuildingOfficeIcon } from "@phosphor-icons/react/dist/csr/BuildingOffice";
import { CardsThreeIcon } from "@phosphor-icons/react/dist/csr/CardsThree";
import { ClockIcon } from "@phosphor-icons/react/dist/csr/Clock";
import { QuestionIcon } from "@phosphor-icons/react/dist/csr/Question";
import { ClipboardTextIcon } from "@phosphor-icons/react/dist/csr/ClipboardText";
import { FileTextIcon } from "@phosphor-icons/react/dist/csr/FileText";
import { NewspaperIcon } from "@phosphor-icons/react/dist/csr/Newspaper";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { useConvexAuth } from "convex/react";

export default function AppHeader() {
  const { isAuthenticated } = useConvexAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
        <p className="text-lg font-bold truncate">
          Recommend <span className="text-primary -ml-1">Well</span>
        </p>
      </Link>
      {/* Desktop navigation */}
      <NavigationMenu className="hidden md:flex" viewport={false}>
        <NavigationMenuList className="flex items-center gap-4 lg:gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[600px] lg:grid-cols-[.5fr_1fr]">
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
                        Browse our collection of templates by category.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/categories/industry"
                  title="By Industry"
                  icon={<BuildingOfficeIcon size={32} weight="duotone" />}
                >
                  Browse templates by industry
                </ListItem>
                <ListItem
                  href="/categories/reason"
                  title="By Reason"
                  icon={<QuestionIcon size={32} weight="duotone" />}
                >
                  Browse templates by reason
                </ListItem>
                <ListItem
                  href="/categories/notice-period"
                  title="By Notice Period"
                  icon={<ClockIcon size={32} weight="duotone" />}
                >
                  Browse templates by notice period
                </ListItem>
                <ListItem
                  href="/all-templates"
                  title="View All Templates"
                  icon={<CardsThreeIcon size={32} weight="duotone" />}
                >
                  View all resignation letter templates
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
                  href="/resources/how-to-write-resignation-letter"
                  title="How to Write"
                  icon={<BookOpenIcon size={32} weight="duotone" />}
                >
                  How to write a resignation letter
                </ListItem>
                <ListItem
                  href="/resources/samples-and-examples"
                  title="Samples and Examples"
                  icon={<ClipboardTextIcon size={32} weight="duotone" />}
                >
                  Resignation letter samples & examples
                </ListItem>
                <ListItem
                  href="/resources/blog"
                  title="Blog"
                  icon={<NewspaperIcon size={32} weight="duotone" />}
                >
                  Helpful articles - resignation & transitions
                </ListItem>
                <ListItem
                  href="/resources/all-letter-types"
                  title="All Letter Types"
                  icon={<FileTextIcon size={32} weight="duotone" />}
                >
                  List of all the scenarios of resignation
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
                  <span className="font-semibold">Resign Well</span>
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
                <Link
                  href="/categories/industry"
                  className="px-4 py-3  text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  By Industry
                </Link>
                <Link
                  href="/categories/reason"
                  className="px-4 py-3  text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  By Reason
                </Link>
                <Link
                  href="/categories/notice-period"
                  className="px-4 py-3 border-b text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  By Notice Period
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
                  href="/resources/how-to-write-resignation-letter"
                  className="px-4 py-3  text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How to Write
                </Link>
                <Link
                  href="/resources/samples-and-examples"
                  className="px-4 py-3 border-b text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Samples and Examples
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
