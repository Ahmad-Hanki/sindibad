"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import ar from "@/public/images/ar.png";
import en from "@/public/images/en.jpg";
import tr from "@/public/images/tr.jpg";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FlagsPc = ({ choseALanguage }: { choseALanguage: string }) => {
  const locale = useLocale();
  const pathname = usePathname(); // Get the current pathname

  //   const switchLocale = (newLocale: string) => {
  //     return pathname.replace(`/${locale}`, `/${newLocale}`);
  //   };

  const switchLocale = (newLocale: string) => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return "/" + newLocale + pathname.replace(/^\/(en|ar|tr)/, "");
  };

  const getOnlyPathname = (): string => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return pathname.replace(/^\/(en|ar|tr)/, "/");
  };

  const pn = getOnlyPathname();

  const flags = [
    {
      title: "English",
      href: switchLocale("en"), // Dynamically generate the href
      flag: en,
      active: locale === "en",
    },
    {
      title: "العربية",
      href: switchLocale("ar"), // Dynamically generate the href
      flag: ar,
      active: locale === "ar",
    },
    {
      title: "Türkçe",
      href: switchLocale("tr"), // Dynamically generate the href
      flag: tr,
      active: locale === "tr",
    },
  ];

  const currentFlag = flags.find((flag) => flag.active) || flags[0]; // Default to English if no match

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative h-5 w-7 overflow-hidden aspect-auto">
              <Image
                src={currentFlag.flag}
                alt={currentFlag.title}
                className="object-contain object-center"
                fill
              />
            </div>
            <span className={cn("text-lg", pn == "/" && "text-white")}>
              {currentFlag.title}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{choseALanguage}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {flags.map((flag) => (
            <DropdownMenuItem key={flag.title} asChild>
              <Link href={flag.href}>
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-7 overflow-hidden aspect-auto">
                    <Image
                      src={flag.flag}
                      alt={flag.title}
                      className="object-contain object-center"
                      fill
                    />
                  </div>
                  <span className="text-lg">{flag.title}</span>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FlagsPc;
