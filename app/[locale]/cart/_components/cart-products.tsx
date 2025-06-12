import Link from "next/link";
import { useAllCartData } from "../_api/get-cart-data";
import { Card } from "@/components/ui/card";
import CartItem from "./cart-item";
import RightSidePayment from "./right-side-payment";
import { useUser } from "@/server-actions/auth/get-user";

const CartProducts = () => {
  const { data: userData } = useUser({});
  const { data } = useAllCartData({
    userId: userData?.id ?? "",
    queryConfig: { enabled: !!userData?.id },
  });

  if (data?.cartItems.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">
          Sepetiniz Boş,{" "}
          <span className="text-blue-500">
            <Link href={"/"}>Look at the products</Link>
          </span>
        </h1>
      </Card>
    );
  }
  return (
    <div className="w-full flex flex-col lg:flex-row 
    max-lg:items-center max-lg:justify-center md:max-lg:px-12
     max-lg:space-y-12 lg:space-x-12 mb-44">
      {/* Left Side Section */}
      <div className="w-full">
        {data?.cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      {/* Right Side Section */}
      {data && <RightSidePayment cartData={data} />}
    </div>
  );
};

export default CartProducts;
