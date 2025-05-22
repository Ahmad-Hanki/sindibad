import Container from "@/components/Container";

import MenuClient from "./MenuClient";
import { preloadDashboardData } from "../dashboard/_utils/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadDashboardData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-3">
        <Container>
          <MenuClient locale={locale} />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default page;
