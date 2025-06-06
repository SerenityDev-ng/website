"use client";

import {
  apple_button,
  google_button,
  hand_phone,
  logo_white,
  purple,
  yellow,
} from "@/assets/images";
import { Instagram, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  phone?: boolean;
};

const Footer = (props: Props) => {
  const pathname = usePathname();

  const allow = pathname === "/";
  return (
    <footer className="relative z-20">
      {allow && (
        <div className="dark:bg-secondary">
          <div className="h-[329px] relative flex items-center gap-9 justify-center mx-auto px-5">
            <Image
              src={yellow}
              alt=""
              height={0}
              width={0}
              sizes="100vw"
              className="object-cover h-[60%] hidden lg:block lg:w-[292px] absolute top-0 left-0 z-20"
            />
            <Image
              src={purple}
              alt=""
              height={0}
              width={0}
              sizes="100vw"
              className="object-cover h-[50%] hidden lg:block lg:w-[292px] absolute bottom-0 left-0 z-10"
            />

            <div className="relative z-30">
              <h1 className=" font-league-spartan font-medium text-[40px] text-black text-center">
                COMING SOON...
              </h1>

              <div className="flex gap-3 items-center mt-8 ">
                <Image
                  src={google_button}
                  alt=""
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-full w-[167px] object-contain dark:shadow-md "
                />
                <Image
                  src={apple_button}
                  alt=""
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-full w-[167px] object-contain dark:shadow-md"
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src={hand_phone}
                alt=""
                height={0}
                width={0}
                sizes="100vw"
                className="h-[320px] w-[385px] object-contain"
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-primary pb-[107px] pt-[64px] px-5">
        <div className=" bg-primary flex flex-col gap-4 lg:justify-between lg:flex-row lg:items-center max-w-screen-xl mx-auto">
          <aside>
            <Image
              src={logo_white}
              alt=""
              height={76}
              width={300}
              className="object-contain"
            />
            <p className=" font-league-spartan font-medium lg:text-xl max-w-[455px] text-white">
              Enjoy professional home care service at your convenience ensuring
              a clean and comfortable living space.{" "}
            </p>
          </aside>

          <aside className="text-white">
            <h1 className=" font-league-spartan font-semibold text-lg lg:text-[36px] mb-[52px]">
              Quick Links
            </h1>
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-start font-league-spartan">
              <div>
                <h1>COMPANY</h1>
                <div className="space-y-4 pt-6">
                  <div className="flex gap-2 items-center text-lg">
                    About Us
                  </div>
                  <div className="flex gap-2 items-center text-lg">
                    Services
                  </div>
                  <div className="flex gap-2 items-center text-lg">
                    <Link href="/terms-conditions">Terms Of Use</Link>
                  </div>
                  <div className="flex gap-2 items-center text-lg">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </div>
                </div>
              </div>
              <div>
                <h1>EXPLORE</h1>
                <div className="space-y-4 pt-6">
                  <div className="flex gap-2 items-center text-lg">
                    <Link href="/employment">Career</Link>
                  </div>
                  {/* <div className="flex gap-2 items-center text-lg">
                    <Link href="/marketplace">Marketplace</Link>
                  </div> */}
                  <div className="flex gap-2 items-center text-lg">
                    Gift A Service
                  </div>
                </div>
              </div>
              <div>
                <h1>CONTACT SUPPORT</h1>
                <div className="space-y-4 pt-6">
                  <div className="flex gap-2 items-center text-lg">
                    <Mail />
                    <a href="mailto:mail@serenity.ng"> mail@serenity.ng</a>
                  </div>
                  <div className="flex gap-2 items-center text-lg">
                    <PhoneCall />
                    <a href="https://wa.me/2348135518126?text=Hello,%20I'm%20contacting%20you%20from%20your%20website%20serenity.ng">
                      0813 551 8126
                    </a>
                  </div>
                  <div className="flex gap-2 items-center text-lg">
                    <Instagram />
                    <a href="https://www.instagram.com/serenity.ng_official">
                      {" "}
                      serenity.ng_official
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
