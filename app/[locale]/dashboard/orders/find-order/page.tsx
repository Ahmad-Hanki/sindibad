import { HydrationBoundary } from "@tanstack/react-query";
import { preloadOneOrderData } from "./_utils/preload-data";
import OrderDetailClient from "./order-detail-client";

const OrderDetailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) => {
  const orderId = (await searchParams).orderId;

  const { dehydratedState } = await preloadOneOrderData({ orderId });

  return (
    <HydrationBoundary state={dehydratedState}>
      <OrderDetailClient orderId={orderId} />
    </HydrationBoundary>
  );
};

export default OrderDetailPage;
