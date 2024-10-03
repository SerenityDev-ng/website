"use client";

import { serenity_logo } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  const links = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Services",
      href: "/services",
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
    },
    {
      id: 4,
      name: "Gifting",
      href: "/gifting",
    },
    {
      id: 5,
      name: "Marketplace",
      href: "/marketplace",
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

  return (
    <main className="bg-secondary relative z-10">
      <header
        ref={navbarRef}
        className="bg-secondary py-7 px-5 flex items-center justify-between gap-4 max-w-screen-xl mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        <nav>
          <Image
            src={serenity_logo}
            alt="Serenity Logo"
            height={60}
            width={199}
            className="object-contain"
          />
        </nav>

        <nav className="lg:flex items-center gap-10 justify-between hidden">
          {links.map((link) => (
            <div key={link.id} className="relative">
              {link.subLinks ? (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "text-lg font-league-spartan text-black capitalize flex items-center",
                      pathname.startsWith(link.href) ? "font-semibold" : ""
                    )}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isDropdownOpen && (
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
                </div>
              ) : (
                <Link href={link.href}>
                  <p
                    className={cn(
                      "text-lg font-league-spartan text-black capitalize",
                      link.href === pathname ? "font-semibold" : ""
                    )}
                  >
                    {link.name}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <nav>
          <Button className="text-lg font-league-spartan font-semibold">
            Get Started
          </Button>
        </nav>
      </header>
    </main>
  );
};

export default Navbar;
