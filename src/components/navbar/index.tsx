"use client";

import { serenity_logo } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
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
  return (
    <main className="bg-secondary relative z-10">
      <header className="bg-secondary py-7 px-5 flex items-center justify-between gap-4 max-w-screen-xl mx-auto ">
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
            <div key={link.id}>
              <Link href={link.href}>
                <p
                  className={cn(
                    "text-lg  font-league-spartan text-black capitalize",
                    link.href === pathname ? "font-semibold " : ""
                  )}
                >
                  {link.name}
                </p>
              </Link>
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
