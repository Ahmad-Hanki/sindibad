"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Flags from "./Flags";
import Cart from "../cart/Cart";
interface MobileNavbarProps {
  links: string[];
  menuText: string;
  getInTouch: string;
}

const MobileNavbar = ({ links, getInTouch, menuText }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  console.log(open);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

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
      url: locale == "en" ? "/menu" : locale == "ar" ? "/ar/menu" : "/tr/menu",
      active:
        locale == "en"
          ? pathname === "/menu"
          : locale == "ar"
          ? pathname === "/ar/menu"
          : pathname === "/tr/menu",
    },
  ];

  const getOnlyPathname = (): string => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return pathname.replace(/^\/(en|ar|tr)/, "/");
  };

  const pn = getOnlyPathname();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="z-[100]">
          <Logo w="w-20" />
        </div>

        <div className="z-[100] flex gap-4 items-center">
          <Cart />
          <Hamburger
            toggled={open}
            onToggle={() => setOpen((prev) => !prev)}
            duration={0.5}
            color={!open && pn == "/" ? "white" : "black"}
            size={32}
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 w-full bg-popover pt-[112px] text-popover-foreground px-4 flex justify-center flex-col  h-[100vh]"
          >
            <p className="text-lg text-muted-foreground">{menuText}</p>

            <div className="flex flex-col gap-8 mt-7">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className={`text-5xl ${
                    link.active ? "text-primary" : "text-secondary-foreground"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="mt-7">
              <Flags />
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <p className="text-muted-foreground  text-lg">{getInTouch}</p>

              <Link className="text-2xl" href={"mailto:itxti909@gmail.com"}>
                itxti909@gmail.com
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
