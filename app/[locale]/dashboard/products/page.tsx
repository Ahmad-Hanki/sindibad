import Container from "@/components/Container";
import { preloadProductData } from "./_utils/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";
import ProductClient from "./product-client";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadProductData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-3">
        <Container>
          <ProductClient locale={locale} />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default page;
