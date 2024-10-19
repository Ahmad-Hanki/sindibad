import { useTranslations } from "next-intl";
import Container from "../Container";
import Link from "next/link";
import { Map, Phone } from "lucide-react";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <div className="bg-primary ">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between py-5">
          <div className="space-y-3 text-center flex-1">
            <h5 className="text-white text-2xl font-semibold">
              {t("aboutSindibad")}
            </h5>
            <p className="text-muted">{t("aboutDescription")}</p>
          </div>

          <div className="space-y-3 text-center flex-1">
            <h5 className="text-white text-2xl font-semibold">
              {t("services")}
            </h5>
            <div className="flex flex-col items-center gap-3">
              <Link className="text-muted w-fit transition-all duration-300 hover:text-muted/70" href={"/"}>
                {t("s1")}
              </Link>
              <Link className="text-muted w-fit transition-all duration-300 hover:text-muted/70" href={"/about"}>
                {t("s2")}
              </Link>
              <Link className="text-muted w-fit transition-all duration-300 hover:text-muted/70" href={"/menu"}>
                {t("s3")}
              </Link>
            </div>
          </div>

          <div className="space-y-3 text-center flex-1">
            <h5 className="text-white text-2xl font-semibold">
              {t("contactData")}
            </h5>

            <div className="flex flex-col gap-7 items-center">
              <div className="flex flex-col gap-3 items-center">
                <Phone className="text-white"/>
                <p className="text-muted">+90 534 927 77 44</p>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <Map className="text-white"/>
                <p className="text-muted">
                  25 Aralık, Tüfekçi Yusuf Blv. No:86, 27100 Şahinbey/Gaziantep
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>


      <div className="bg-popover py-3">
        <h6 className="text-2xl text-popover-foreground text-center">
            {t("copyRight")}
        </h6>
      </div>
    </div>
  );
};

export default Footer;
