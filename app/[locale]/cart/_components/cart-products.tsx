import Link from "next/link";
import { useAllCartData } from "../_api/get-cart-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <span className="text-blue-500">
            <Link href={"/"}>Look at the products</Link>
          </span>
        </h1>
      </Card>
    );
  }

  return (
    <div>
      {data?.cartItems.map((item) => {
        const price = item.product.price * item.quantity;
        return (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 ">
                <div className="relative overflow-hidden aspect-square w-16">
                  <Image
                    src={item.product.image}
                    className="object-center object-cover"
                    fill
                    alt="Product Image"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:justify-between">
                  <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                    <h1 className="text-lg font-semibold ">
                      {item.product.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {item.product.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                      <div className="flex items-center gap-1">
                        <Trash2 className="text-red-500 cursor-pointer" />
                        <p className="text-sm text-red-500 cursor-pointer">
                          Remove
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                      <div className="flex items-center gap-1">
                        <p>
                          <span className="text-lg font-semibold">
                            {price}₺
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                      <div className="flex items-center">
                        <Button variant={"outline"}>
                          <Plus className="" />
                        </Button>
                        <Button
                          type="button"
                          disabled
                          variant={"outline"}
                          onClick={() => {}}
                        >
                          {item.quantity}
                        </Button>
                        <Button variant={"outline"}>
                          <Minus className="" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CartProducts;