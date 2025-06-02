"use client";

import { useOneOrder } from "./_api/get-order-by-random-id";

const OrderDetailClient = ({ orderId }: { orderId: string }) => {
  // todo: complete the component with more details
  const { data } = useOneOrder({
    orderId,
    queryConfig: { enabled: !!orderId },
  });

  return <div>{data?.randomId}</div>;
};

export default OrderDetailClient;
