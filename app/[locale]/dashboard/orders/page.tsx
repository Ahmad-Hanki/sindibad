import { HydrationBoundary } from "@tanstack/react-query";
import { preloadOrderData } from "./_utils/preload-data";
import Container from "@/components/Container";
import OrderClient from "./order-client";

const OrderPage = async () => {
  const { dehydratedState } = await preloadOrderData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-3">
        <Container>
          <OrderClient />
        </Container>
      </div>
    </HydrationBoundary>
  );
};

export default OrderPage;
