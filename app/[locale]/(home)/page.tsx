import { useTranslations } from "next-intl";
import Hero from "./_components/Hero";
import Recommended from "./_components/Recommended";
import bg from "@/public/images/bg.png";
import Location from "./_components/Location";
const Home = () => {
  const t = useTranslations("home");

  const dataForRecommended = [
    {
      id: "1",
      name: "Product 1",
      image: bg,
    },
  ];
  return (
    <div>
      <Hero
        title={t("headerTitle")}
        description={t("headerDescription")}
        buttonText={t("headerButton")}
      />

      <Recommended recommended={t("recommended")} list={dataForRecommended} />

      <Location />
    </div>
  );
};

export default Home;
