"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

interface MobileNavbarProps {
  links: string[];
}

const MobileNavbar = ({ links }: MobileNavbarProps) => {
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
    {
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
    },
  ];

  return <div>MobileNavbar</div>;
};

export default MobileNavbar;
