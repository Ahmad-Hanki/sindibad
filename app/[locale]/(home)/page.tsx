import { useTranslations } from "next-intl";
import Hero from "./_components/Hero";

const Home = () => {
  const t = useTranslations("home");
  return (
    <div>
      <Hero
        title={t("headerTitle")}
        description={t("headerDescription")}
        buttonText={t("headerButton")}
      />
    </div>
  );
};

export default Home;
