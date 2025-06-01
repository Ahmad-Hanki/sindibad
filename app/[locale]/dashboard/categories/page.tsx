import Container from "@/components/Container";

import CategoriesClient from "./categories-client";
import { preloadDashboardData } from "../_utils/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadDashboardData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-3">
        <Container>
          <CategoriesClient locale={locale} />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default page;
