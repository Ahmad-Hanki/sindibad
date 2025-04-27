"use client";
import Hero from "./_components/Hero";
import Recommended from "./_components/Recommended";
import bg from "@/public/images/bg.png";
import Location from "./_components/Location";
import ContactData from "./_components/ContactData";
import { useTranslations } from "next-intl";
import { useMostPopular } from "./_api/get-most-popular";

type T = ReturnType<typeof useTranslations>;

const HomeClient = () => {
  const t = useTranslations("home");
  return (
    <div>
      <Hero
        title={t("headerTitle")}
        description={t("headerDescription")}
        buttonText={t("headerButton")}
      />

      <Recommended recommended={t("recommended")} />

      <Location />

      <ContactData
        address={t("address")}
        phone={t("phone")}
        email={t("email")}
        contactData={t("contactData")}
      />
    </div>
  );
};

export default HomeClient;
