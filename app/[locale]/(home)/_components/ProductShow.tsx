import { useUser } from "@/server-actions/auth/get-user";
import { useAddItemToCart } from "../_api/post-add-to-cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { GetAllProductsResponseType } from "@/server-actions/get/get-all-producats";

function ProductShow({
  item,
  userData,
}: {
  item: GetAllProductsResponseType;
  userData: any;
}) {
  const { mutate, isPending } = useAddItemToCart({
    userId: userData?.id ?? "",

    mutationConfig: {},
  });

  return (
    <>
      {item.mostPopular == true && (
        <div className="h-full relative flex justify-center items-center">
          <div className="absolute w-[90%] bg-primary/70 h-[30%] rounded-full -z-0" />

          <div className="absolute w-full  z-30 flex justify-center items-center">
            <div className="w-[70%] aspect-square relative overflow-hidden rounded-2xl  ">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className=" object-center transition-all duration-500 hover:scale-110"
              />
            </div>
          </div>

          <div className="absolute h-[95%] w-[70%] z-10 flex justify-start items-end">
            <p className="text-xl font-semibold">{item.name}</p>
            {userData?.id ? (
              <Button
                disabled={isPending}
                onClick={() => {
                  mutate({
                    productId: item.id,
                    userId: userData.id,
                  });
                }}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add to cart"
                )}
              </Button>
            ) : (
              <Link href={"/sign-in"}>
                <Button>Add to cart</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductShow;
