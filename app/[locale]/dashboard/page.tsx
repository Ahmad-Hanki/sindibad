import Container from "@/components/Container";

import DashboardClient from "./dashboard-client";
import { preloadDashboardData } from "./_utils/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";
import NavBar from "./_components/NavBar";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadDashboardData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <NavBar />
      <div className="w-full py-3">
        <Container>
          <DashboardClient locale={locale} />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default page;