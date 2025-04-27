
import { preloadHomeData } from "./_lib/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";
import HomeClient from "./home-client";
const Home = async () => {

  const { dehydratedState } = await preloadHomeData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient/>
    </HydrationBoundary>
  );
};

export default Home;
