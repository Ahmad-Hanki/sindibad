import { useTranslations } from "next-intl";
import Container from "../Container";
import PcNavbar from "./PcNavbar";
import MobileNavbar from "./MobileNavbar";
import Logo from "../Logo";

const Navbar = () => {
  const t = useTranslations("navbar");

  const links = [t("home"), t("menu"), t("about"), t("contact")];

  return (
    <div className="bg-popover py-4">
      <Container>
        <div>
          <div className="hidden md:block">
            <PcNavbar links={links} />
          </div>
          <div className="md:hidden">
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
