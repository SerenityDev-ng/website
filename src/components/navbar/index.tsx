"use client";

import { serenity_logo } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronDown,
  Home,
  Briefcase,
  Info,
  Gift,
  ShoppingBag,
  Menu,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";

type Props = {};

const Navbar = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  const links = [
    {
      id: 1,
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      id: 2,
      name: "Services",
      href: "/services",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      subLinks: [
        { name: "Laundry", href: "/services/laundry" },
        { name: "Cleaning", href: "/services/cleaning" },
        { name: "Repair", href: "/services/repair" },
      ],
    },
    {
      id: 3,
      name: "About",
      href: "/about",
      icon: <Info className="h-4 w-4 mr-2" />,
    },
    {
      id: 4,
      name: "Gifting",
      href: "/gifting",
      icon: <Gift className="h-4 w-4 mr-2" />,
    },
    {
      id: 5,
      name: "Marketplace",
      href: "/marketplace",
      icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    },
  ];

  const pathname = usePathname();

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (
      !dropdownRef.current?.contains(e.relatedTarget as Node) &&
      !navbarRef.current?.contains(e.relatedTarget as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {links.map((link) => (
        <div key={link.id} className={cn("relative", mobile && "mb-4")}>
          {link.subLinks ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "text-lg font-league-spartan text-black capitalize flex items-center",
                  pathname.startsWith(link.href)
                    ? "font-semibold text-primary"
                    : ""
                )}
              >
                {link.icon}
                {link.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && !mobile && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className={cn(
                          "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          pathname === subLink.href ? "font-semibold" : ""
                        )}
                        role="menuitem"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {mobile &&
                link.subLinks.map((subLink) => (
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    key={subLink.name}
                    href={subLink.href}
                    className={cn(
                      "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      pathname === subLink.href ? "font-semibold" : ""
                    )}
                  >
                    {subLink.name}
                  </Link>
                ))}
            </div>
          ) : (
            <Link onClick={() => setIsMobileMenuOpen(false)} href={link.href}>
              <p
                className={cn(
                  "text-lg font-league-spartan text-black capitalize flex items-center hover:text-primary duration-300",
                  link.href === pathname ? "font-semibold text-primary" : ""
                )}
              >
                {link.icon}
                {link.name}
              </p>
            </Link>
          )}
        </div>
      ))}
    </>
  );

  return (
    <main className="bg-secondary dark:bg-secondary relative z-10">
      <header
        ref={navbarRef}
        className="bg-secondary py-7 px-5 flex items-center justify-between gap-4 max-w-screen-xl mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        <nav className="flex items-center">
          <Image
            src={serenity_logo}
            alt="Serenity Logo"
            height={60}
            width={199}
            className="object-contain"
          />
        </nav>

        <nav className="hidden lg:flex items-center gap-10 justify-between">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <Button className="text-lg font-league-spartan font-semibold hidden sm:inline-flex hover:bg-primary">
            Get Started
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="outline"
                size="icon"
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] dark:bg-secondary"
            >
              <nav className="flex flex-col mt-6">
                <NavLinks mobile />
                <Button className="text-lg font-league-spartan font-semibold mt-4 hover:bg-primary">
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </header>
    </main>
  );
};

export default Navbar;
