import Link from "next/link";
import { useAllCartData } from "../_api/get-cart-data";
import { Card, CardContent } from "@/components/ui/card";

const CartProducts = ({ userId }: { userId: string }) => {
  const { data } = useAllCartData({
    userId: userId,
    queryConfig: { enabled: !!userId },
  });

  if (data?.cartItems.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">
          Sepetiniz Boş,{" "}
          <span>
            <Link href={"/"}>Look at the products</Link>
          </span>
        </h1>
      </Card>
    );
  }

  return <Card>
    <CardContent>

    </CardContent>
  </Card>;
};

export default CartProducts;
