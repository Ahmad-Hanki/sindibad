"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "../Logo";

interface PcNavbarProps {
  links: string[];
}

const PcNavbar = ({ links }: PcNavbarProps) => {
  const locale = useLocale();

  const pathname = usePathname();
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
    url:
      locale == "en"
        ? "/contact"
        : locale == "ar"
        ? "/ar/contact"
        : "/tr/contact",
    active:
      locale == "en"
        ? pathname === "/contact"
        : locale == "ar"
        ? pathname === "/ar/contact"
        : pathname === "/tr/contact",
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
              className={`text-xl text-secondary-foreground/70  transition-all duration-200 hover:text-primary/70  ${
                link.active && "!text-primary"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href={contact.url}>
            <Button variant={"default"} className="px-3 rounded-md text-xl">
              {contact.title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PcNavbar;
