import { useUser } from "@/server-actions/auth/get-user";
import { useAllOrderData } from "../_api/get-orders-data";
import OrdersHeader from "./OrdersHeader";
import OrderItem from "./OrderItem";

function MyOrders() {
  const { data: userData } = useUser({});
  const { data:orders } = useAllOrderData({
    userId: userData?.id ?? "",
    queryConfig: { enabled: !!userData?.id },
  });

  return (
    <section className="px-24 py-20">
      {/* Count Section */}
      <OrdersHeader />
      {/* Orders Section */}
      <div className="w-full">
        {orders?.orderItems?.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default MyOrders;
