"use client";
import Hero from "./_components/Hero";
import Recommended from "./_components/Recommended";
import Location from "./_components/Location";
import ContactData from "./_components/ContactData";
import { useTranslations } from "next-intl";
// import { signOut } from "next-auth/react";

const HomeClient = ({ locale }: { locale: string }) => {
  const t = useTranslations("home");
  return (
    <div>
      <Hero
        title={t("headerTitle")}
        description={t("headerDescription")}
        buttonText={t("headerButton")}
      />
      <Recommended recommended={t("recommended")} locale={locale} />
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
