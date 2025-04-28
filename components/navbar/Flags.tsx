"use client";
import ar from "@/public/images/ar.jpg";
import en from "@/public/images/en.jpg";
import tr from "@/public/images/tr.jpg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Flags = () => {
  const pathname = usePathname();

  // Helper function to switch locale in the pathname
  const switchLocale = (newLocale: string) => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return "/" + newLocale + pathname.replace(/^\/(en|ar|tr)/, "");
  };

  const flags = [
    {
      title: "English",
      href: switchLocale("en"),
      flag: en,
    },
    {
      title: "العربية",
      href: switchLocale("ar"),
      flag: ar,
    },
    {
      title: "Türkçe",
      href: switchLocale("tr"),
      flag: tr,
    },
  ];

  return (
    <div>
      <div className="flex space-y-2 flex-col">
        {flags.map((flag) => (
          <Link key={flag.title} href={flag.href}>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-10 overflow-hidden aspect-auto">
                <Image
                  src={flag.flag}
                  alt={flag.title}
                  fill
                  className="object-contain object-center"
                />
              </div>
              <span className="text-xl">{flag.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Flags;
