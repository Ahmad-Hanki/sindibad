import Container from "@/components/Container";

import MenuClient from "./MenuClient";
import { HydrationBoundary } from "@tanstack/react-query";
import { preloadMenuData } from "./_utils/preload-data";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { dehydratedState } = await preloadMenuData();
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
