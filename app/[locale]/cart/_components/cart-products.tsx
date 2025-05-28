import Link from "next/link";
import { useAllCartData } from "../_api/get-cart-data";
import { Card } from "@/components/ui/card";
import CartItem from "./cart-item";
import RightSidePayment from "./right-side-payment";

const CartProducts = ({ userId }: { userId: string }) => {
  const { data } = useAllCartData({
    userId: userId,
    queryConfig: { enabled: !!userId },
  });
  const price = data?.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
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
    <div className="w-full flex space-x-12 mb-44">
      {/* Left Side Section */}
      <div className="w-full">
        {data?.cartItems.map((item) => {
          return <CartItem key={item.id} item={item} userId={userId}/>;
        })}
      </div>
      {/* Right Side Section */}
      {price && <RightSidePayment price={price} />}
    </div>
  );
};

export default CartProducts;
