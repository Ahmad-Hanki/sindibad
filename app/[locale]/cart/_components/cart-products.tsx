import Link from "next/link";
import { useAllCartData } from "../_api/get-cart-data";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const CartProducts = ({ userId }: { userId: string }) => {
  const t = useTranslations("cart");
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
          const price = item.product.price * item.quantity;
          return (
            <section key={item.id} className="">
              <div className="p-4  border-b ">
                <div className="flex items-center gap-3 ">
                  {/* Image Section */}
                  <div className="relative overflow-hidden aspect-square w-20">
                    <Image
                      src={item.product.image}
                      className="object-center object-cover"
                      fill
                      alt="Product Image"
                    />
                  </div>
                  {/* Product Details Section */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:justify-between">
                    {/* Left Section */}
                    <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                      <h1 className="text-lg ">{item.product.name}</h1>
                      <p className="text-sm text-gray-500">
                        {t("price")} :{" "}
                        <span className="text-black">
                          {" "}
                          ₺ {item.product.price}
                        </span>
                      </p>
                      <div className="text-sm text-gray-500 flex flex-col lg:flex-row items-center">
                        <p> {t("quantity")} </p>
                        <div className="flex flex-col  break-all line-clamp-1 overflow-hidden">
                          <div className="flex items-center -space-x-1">
                            <Button
                              variant={"ghost"}
                              className=" hover:bg-transparent"
                            >
                              <Minus className="w-3 hover:text-black" />
                            </Button>
                            <p className=" text-black">{item.quantity}</p>
                            <Button
                              variant={"ghost"}
                              className=" hover:bg-transparent"
                            >
                              <Plus className="w-4 text-black hover:text-gray-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Right Section */}
                    <div className="space-y-7 flex flex-col items-end">
                      <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden ">
                        <div className="flex items-center gap-1">
                          <Trash2 className="text-red-500 cursor-pointer w-5" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
                        <div className="flex items-center gap-1">
                          <p>
                            <span className="text-lg ">₺ {price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      {/* Right Side Section */}
      <div className="w-1/2 h-[300px] bg-gray-100 border border-gray-100 p-5">
        <section className="p-4">
          <h2 className="text-lg font-bold mb-4">{t("subtotal")}</h2>
          <div className="flex justify-between mt-12">
            <p>{t("total")}</p>
            <p className="text-lg font-bold">₺ {price}</p>
          </div>
          <div className="w-full mt-16">
            <Button asChild className="w-full py-6 rounded-sm">
              <Link href={"/odeme"} className="text-xl">
                {t("checkout")} <span className="ml-4 ">{">"}</span>{" "}
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartProducts;
