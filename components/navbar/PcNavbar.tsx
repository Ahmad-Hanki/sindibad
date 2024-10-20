"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "../Logo";
import FlagsPc from "./FlagsPc";
import { cn } from "@/lib/utils";
import Cart from "../cart/Cart";
import { User } from "lucide-react";

interface PcNavbarProps {
  links: string[];
  choseALanguage: string;
}

const PcNavbar = ({ links, choseALanguage }: PcNavbarProps) => {
  const locale = useLocale();

  const pathname = usePathname();

  const getOnlyPathname = (): string => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return pathname.replace(/^\/(en|ar|tr)/, "/");
  };

  const pn = getOnlyPathname();
  console.log(pn);

  const navLinks = [
    {
      title: links[0],
      url: locale == "en" ? "/" : locale == "ar" ? "/ar" : "/tr",
      active:
        locale == "en"
          ? pathname === "/"
          : locale == "ar"
          ? pathname === "/ar"
          : pathname === "/tr",
    },
    {
      title: links[1],
      url: locale == "en" ? "/menu" : locale == "ar" ? "/ar/menu" : "/tr/menu",
      active:
        locale == "en"
          ? pathname === "/menu"
          : locale == "ar"
          ? pathname === "/ar/menu"
          : pathname === "/tr/menu",
    },
    {
      title: links[2],
      url:
        locale == "en" ? "/about" : locale == "ar" ? "/ar/about" : "/tr/about",
      active:
        locale == "en"
          ? pathname === "/about"
          : locale == "ar"
          ? pathname === "/ar/about"
          : pathname === "/tr/about",
    },
  ];

  const contact = {
    title: links[3],
    url: locale == "en" ? "/menu" : locale == "ar" ? "/ar/menu" : "/tr/menu",
    active:
      locale == "en"
        ? pathname === "/menu"
        : locale == "ar"
        ? pathname === "/ar/menu"
        : pathname === "/tr/menu",
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-1">
        <Logo w="w-20" />

        <nav className="flex gap-8 items-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={cn(
                "text-xl text-secondary-foreground/70  transition-all duration-200 hover:text-primary/70",
                link.active && "text-primary",
                pn === "/" && !link.active && "text-white"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 mx-9">
            <Cart />
            <Link href={"/dashboard"}>
              <User
                className={cn(
                  "transition-all duration-200  hover:text-primary/70 w-9 h-9 lg:w-8 lg:h-8",
                  getOnlyPathname() == "/" && "text-white"
                )}
              />
            </Link>
          </div>
          <Link href={contact.url}>
            <Button variant={"default"} className="px-3 rounded-md text-xl">
              {contact.title}
            </Button>
          </Link>
          <FlagsPc choseALanguage={choseALanguage} />
        </div>
      </div>
    </div>
  );
};

export default PcNavbar;
