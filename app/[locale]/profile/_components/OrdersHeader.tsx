import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { useUser } from "@/server-actions/auth/get-user";

function OrdersHeader() {
  const { data: userData } = useUser({});
  const { data: count } = useCartCount({
    userId: userData?.id ?? "",
  });
  return (
    <section className="p-3">
      <div className=" font-semibold text-xl ">My Orders ({count})</div>
    </section>
  );
}

export default OrdersHeader;
