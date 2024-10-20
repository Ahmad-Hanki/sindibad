import { useTranslations } from "next-intl";
import Container from "../Container";
import PcNavbar from "./PcNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const t = useTranslations("navbar");

  const links = [t("home"), t("menu"), t("about"), t("order")];

  return (
    <div className="py-4 z-30 relative">
      <Container>
        <div>
          <div className="hidden lg:block">
            <PcNavbar choseALanguage={t("choseALanguage")} links={links} />
          </div>
          <div className="lg:hidden">
            <MobileNavbar
              menuText={t("links")}
              getInTouch={t("getInTouch")}
              links={links}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
