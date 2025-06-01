import Container from "@/components/Container";

import CategoriesClient from "./categories-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { preloadCategoriesData } from "./_utils/preload-data";

const CategoryPage = async () => {
  const { dehydratedState } = await preloadCategoriesData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-3">
        <Container>
          <CategoriesClient />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryPage;
