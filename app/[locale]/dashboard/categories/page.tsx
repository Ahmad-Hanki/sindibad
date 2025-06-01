import Container from "@/components/Container";

import CategoriesClient from "./categories-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { preloadCategoriesData } from "./_utils/preload-data";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadCategoriesData();
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
