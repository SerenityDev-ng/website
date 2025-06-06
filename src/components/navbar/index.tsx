"use client";

import { cleaning, laundry_iron, repair, serenity_logo } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  User,
  UserRoundIcon,
  BookDashed,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useAuthStore } from "@/hooks/store/user";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {};

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
      { name: "Repair", href: "/services/repair" },
      { name: "Laundry", href: "/services/laundry" },
      { name: "Cleaning", href: "/services/cleaning" },
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
  // {
  //   id: 5,
  //   name: "Marketplace",
  //   href: "/marketplace",
  //   icon: <ShoppingBag className="h-4 w-4 mr-2" />,
  // },
  {
    id: 6,
    name: "Blog",
    href: "/blog",
    icon: <BookDashed className="h-4 w-4 mr-2" />,
  },
];

const DesktopNavbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    try {
      const relatedTarget = e.relatedTarget as Element | null;

      // If there's no relatedTarget or it's not a valid Element, close the dropdown
      if (!relatedTarget || !(relatedTarget instanceof Node)) {
        setIsDropdownOpen(false);
        return;
      }

      const isInDropdown =
        dropdownRef.current && dropdownRef.current.contains(relatedTarget);
      const isInNavbar =
        navbarRef.current && navbarRef.current.contains(relatedTarget);

      if (!isInDropdown && !isInNavbar) {
        setIsDropdownOpen(false);
      }
    } catch (error) {
      // Fallback: close dropdown if any error occurs
      console.error("Error in handleMouseLeave:", error);
      setIsDropdownOpen(false);
    }
  };

  return (
    <header
      ref={navbarRef}
      className="bg-secondary py-7 px-5 flex items-center justify-between gap-4 max-w-screen-xl mx-auto z-20"
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex items-center">
        <Link href="/">
          <Image
            src={serenity_logo}
            alt="Serenity Logo"
            height={60}
            width={199}
            className="object-contain"
          />
        </Link>
      </nav>

      <nav className="flex items-center gap-10 justify-between">
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
                    pathname.startsWith(link.href)
                      ? "font-semibold text-primary"
                      : ""
                  )}
                >
                  {link.icon}
                  {link.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-0 animate-in right-0 mx-auto  mt-4 w-[calc(100vw-2rem)] max-w-7xl bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 !z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className=" py-10 px-6 xl:p-16 xl:py-24 flex items-center justify-between relative z-20 overflow-hidden"
                      role="menu"
                      aria-orientation="horizontal"
                      aria-labelledby="options-menu"
                    >
                      <div className="relative z-10 flex flex-col gap-3 text-gray-500 p-10 border-r border-r-gray-300">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className={cn(
                              " font-league-spartan text-2xl capitalize hover:text-primary",
                              pathname === subLink.href
                                ? "font-semibold text-primary"
                                : ""
                            )}
                            role="menuitem"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                      <div className="relative z-10 flex items-center gap-5">
                        <div
                          onClick={() => router.push("/services/cleaning")}
                          className="cursor-pointer"
                        >
                          <Image
                            src={cleaning}
                            alt="cleaning"
                            height={90}
                            width={250}
                            className="object-contain rounded-lg"
                          />
                          <p className="text-sm text-gray-400 w-[230px] pt-3 font-inter">
                            Leave the dusting, scrubbing, and vacuuming to us!
                            Our cleaning pros ensure every corner of your home
                            is sparkling clean.
                          </p>
                          <Link
                            href="/services/cleaning"
                            className="text-primary font-semibold m2"
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="hidden xl:block cursor-pointer"
                          onClick={() => router.push("/services/laundry")}
                        >
                          <Image
                            src={laundry_iron}
                            alt="cleaning"
                            height={90}
                            width={250}
                            className="object-contain rounded-lg"
                          />
                          <p className="text-sm text-gray-400 w-[230px] pt-3 font-inter">
                            Say goodbye to laundry day blues! We offer quick,
                            efficient laundry and ironing services tailored to
                            your schedule.
                          </p>
                          <Link
                            href="/services/laundry"
                            className="text-primary font-semibold m2"
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          onClick={() => router.push("/services/repair")}
                          className="cursor-pointer"
                        >
                          <Image
                            src={repair}
                            alt="cleaning"
                            height={90}
                            width={250}
                            className="object-contain rounded-lg"
                          />
                          <p className="text-sm text-gray-400 w-[230px] pt-3 font-inter">
                            Got a leaky faucet or an electrical issue? Our
                            certified technicians are on call to fix your home
                            maintenance problems.
                          </p>
                          <Link
                            href="/services/repair"
                            className="text-primary font-semibold m2"
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                      <div className=" h-[600px] w-20 bg-secondary opacity-30  absolute !z-[0]"></div>
                      {/* <div className=" h-[800px] w-[400px] bg-secondary opacity-30 skew-y-12 absolute !z-[0] right-[100px] -rotate-[30deg]"></div> */}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href={link.href}>
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
      </nav>

      <div className="flex items-center gap-4">
        {!user?.user.email ? (
          <Button
            onClick={() => router.push("/callback/sign-in")}
            className="text-lg font-league-spartan font-semibold hover:bg-primary"
          >
            Get Started
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger>
              <UserRoundIcon className="h-10 w-10 bg-primary p-2 rounded-full text-white" />
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <Link href="/profile">
                <Button className="text-lg font-league-spartan capitalize flex items-center text-primary  hover:text-black duration-300 w-full bg-transparent hover:bg-secondary">
                  <UserRoundIcon className="h-6 w-6" />
                  Profile
                </Button>
              </Link>

              <Button
                variant={"destructive"}
                className="w-full bg-transparent text-red-500 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

const MobileNavbar = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-secondary py-7 px-5 flex items-center justify-between gap-4 max-w-screen-xl mx-auto">
      <nav className="flex items-center">
        <Image
          src={serenity_logo}
          alt="Serenity Logo"
          height={60}
          width={199}
          className="object-contain"
        />
      </nav>

      <div className="flex items-center gap-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="outline"
              size="icon"
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
              {links.map((link) => (
                <div key={link.id} className="mb-4">
                  {link.subLinks ? (
                    <>
                      <p className="text-lg flex items-center font-league-spartan text-black capitalize mb-2">
                        {link.icon}
                        {link.name}
                      </p>
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                            pathname === subLink.href ? "font-semibold" : ""
                          )}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <p
                        className={cn(
                          "text-lg font-league-spartan text-black capitalize flex items-center hover:text-primary duration-300",
                          link.href === pathname
                            ? "font-semibold text-primary"
                            : ""
                        )}
                      >
                        {link.icon}
                        {link.name}
                      </p>
                    </Link>
                  )}
                </div>
              ))}
              {!user?.user.email && (
                <Button
                  onClick={() => router.push("/callback/sign-in")}
                  className="text-lg font-league-spartan font-semibold mt-4 hover:bg-primary"
                >
                  Get Started
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        {user?.user?.email && (
          <Popover>
            <PopoverTrigger>
              <UserRoundIcon className="h-10 w-10 bg-primary p-2 rounded-full text-white" />
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <Link href="/profile">
                <Button className="text-lg font-league-spartan capitalize flex items-center text-primary  hover:text-black duration-300 w-full bg-transparent hover:bg-secondary">
                  <UserRoundIcon className="h-6 w-6" />
                  Profile
                </Button>
              </Link>

              <Button
                variant={"destructive"}
                className="w-full bg-transparent text-red-500 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

const Navbar = (props: Props) => {
  return (
    <div className="bg-secondary dark:bg-secondary z-50 !sticky top-0">
      <div className="hidden lg:block z-50">
        <DesktopNavbar />
      </div>
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
