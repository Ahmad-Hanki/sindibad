import { useAddItemToCart } from "../_api/post-add-to-cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GetAllProductsResponseType } from "@/server-actions/get/get-all-producats";
import { useUser } from "@/server-actions/auth/get-user";

function ProductShow({
  item,
  locale,
}: {
  item: GetAllProductsResponseType;
  locale: string;
}) {
  const { data: userData } = useUser({});

  const { mutate, isPending } = useAddItemToCart({
    userId: userData?.id ?? "",

    mutationConfig: {},
  });

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center p-5">
        {/*image section*/}
        <div className="w-full flex justify-center items-center">
          <div className="w-[80%] aspect-square relative overflow-hidden rounded-2xl  ">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className=" object-center transition-all duration-500 hover:scale-110 object-cover "
            />
          </div>
        </div>
        {/*text section*/}
        <section className="flex flex-col space-y-4 w-[80%]">
          {/*name section*/}
          <div
            className={` ${
              locale == "ar" ? " justify-start " : " justify-end "
            } " flex items-center  "`}
          >
            <p className="text-xl font-semibold">
              {locale == "en"
                ? item.name
                : locale == "ar"
                ? item.name_ar
                : item.name_tr}
            </p>
          </div>
          {/*description section*/}
          <div
            className={` ${
              locale == "ar" ? " justify-start " : " justify-end "
            } " flex items-end "`}
          >
            <p className="text-lg ">
              {locale == "en"
                ? item.description
                : locale == "ar"
                ? item.description_ar
                : item.description_tr}
            </p>
          </div>
          {/*price and button section*/}
          <div
            className={` ${
              locale == "ar" ? " justify-start " : " justify-end "
            } " flex items-center justify-between "`}
          >
            <p className="text-lg font-semibold">{item.price}TL</p>
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
                  <ShoppingCart className="w-8 h-9 py-1" />
                )}
              </Button>
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  <ShoppingCart className="w-8 h-9 py-1" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductShow;
