import { useAddItemToCart } from "../_api/post-add-to-cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { GetAllProductsResponseType } from "@/server-actions/get/get-all-producats";
import { useUser } from "@/server-actions/auth/get-user";
import Images from "@/components/ui/Images";

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
      <div className="flex flex-col  justify-center items-center ">
        {/*image section*/}
        <div className="relative w-full ">
          <Images
            url={item.image}
            addClass=" transition-all duration-500 hover:scale-110 object-cover h-[250px] w-full "
            clas=" object-cover "
          />
          {/*name section*/}
          <div
            className={` ${
              locale == "ar"
                ? " justify-start right-5 "
                : " justify-end left-5 "
            } " flex items-center absolute -bottom-5 bg-primary text-white px-12 py-2  "`}
          >
            <p className="text-xl font-semibold">
              {locale == "en"
                ? item.name
                : locale == "ar"
                ? item.name_ar
                : item.name_tr}
            </p>
          </div>
        </div>

        {/*text section*/}
        <section className="flex flex-col space-y-4 p-4 bg-secondary w-full ">
          {/*description section*/}
          <div
            className={` ${
              locale == "ar" ? "  " : " "
            } " flex items-end mt-5 text-white font-semibold  justify-start "`}
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
            <p className="text-lg font-semibold text-white border border-primary rounded-full px-5 py-1">
              {item.price}TL
            </p>
            {userData?.id ? (
              <Button
                className="rounded-full py-7 px-2"
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
                  <ShoppingCart className="w-9 h-9 py-1" />
                )}
              </Button>
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  <ShoppingCart className="w-9 h-9 py-1" />
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
