import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
function NavBar() {
  const t = useTranslations("dashboard");
  const navTexts = [
    {
      text: t("buttonTextOne"),
      url: "/dashboard",
    },
    {
      text: t("buttonTextTwo"),
      url: "/dashboard/products",
    },
    {
      text: t("buttonTextThree"),
      url: "/dashboard/orders",
    },
  ];
  return (
    <nav className="w-full flex gap-x-5 justify-center items-center">
      {navTexts.map((button, index) => (
        <Button key={index} asChild className="py-2 px-5  font-semibold">
          <Link href={button.url} className="px-12">
            {button.text}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export default NavBar;