import { preloadHomeData } from "./_lib/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";
import HomeClient from "./home-client";
const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadHomeData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient locale={locale} />
    </HydrationBoundary>
  );
};

export default Home;
