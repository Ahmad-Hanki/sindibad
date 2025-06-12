import { Button } from "@/components/ui/button";
import { CartItemWithProductType } from "@/server-actions/get/get-cart-data-action";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAddOneQuantity } from "../_api/add-one-quantity-data";
import { useDeleteOneQuantity } from "../_api/delete-one-quantity-data";
import { useRemoveOneItem } from "../_api/remove-one-item-data";
import { useUser } from "@/server-actions/auth/get-user";

const CartItem = ({ item }: { item: CartItemWithProductType }) => {
  const { data: userData } = useUser({});

  const price = item.product.price * item.quantity;
  const t = useTranslations("cart");

  const { mutate: addOneQuantity, isPending: isAddOneQuantityPending } =
    useAddOneQuantity({ userId: userData?.id ?? "" });
  const { mutate: deleteOneQuantity, isPending: isDeleteOneQuantityPending } =
    useDeleteOneQuantity({ userId: userData?.id ?? "" });
  const { mutate: removeOneItem, isPending: isRemoveOneItemPending } =
    useRemoveOneItem({ userId: userData?.id ?? "" });

  return (
    <section key={item.id}>
      <div className="p-4  border-b ">
        <div className="flex-col lg:flex-row items-center gap-3 ">
          {/* Image Section */}
          <div className="relative overflow-hidden aspect-square w-20 mb-5">
            <Image
              src={item.product.image}
              className="object-center object-cover"
              fill
              alt="Product Image"
            />
          </div>
          {/* Product Details Section */}
          <div className="flex md:items-center gap-2 w-full justify-between">
            {/* Left Section */}
            <div className="flex flex-col gap-y-2 md:gap-1 break-all line-clamp-1 overflow-hidden">
              <h1 className="text-lg ">{item.product.name}</h1>
              <p className="text-sm text-gray-500">
                {t("price")} :{" "}
                <span className="text-black"> ₺ {item.product.price}</span>
              </p>
              <div className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center">
                <p> {t("quantity")} </p>
                <div className="flex flex-col  break-all line-clamp-1 overflow-hidden">
                  <div className="flex items-center -space-x-1 max-md:-ml-4">
                    <Button
                      variant={"ghost"}
                      className=" hover:bg-transparent"
                      onClick={() => deleteOneQuantity({ id: item.id })}
                      disabled={isDeleteOneQuantityPending}
                    >
                      {isDeleteOneQuantityPending ? (
                        <Loader2 className="w-4 animate-spin text-black" />
                      ) : (
                        <Minus className="w-4 text-black hover:text-gray-600" />
                      )}
                    </Button>
                    <p className=" text-black">{item.quantity}</p>
                    <Button
                      variant={"ghost"}
                      className=" hover:bg-transparent"
                      onClick={() => addOneQuantity({ id: item.id })}
                      disabled={isAddOneQuantityPending}
                    >
                      {isAddOneQuantityPending ? (
                        <Loader2 className="w-4 animate-spin text-black" />
                      ) : (
                        <Plus className="w-4 text-black hover:text-gray-600" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="space-y-7 flex flex-col items-center justify-center md:items-end">
              <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden ">
                <div className="flex items-center gap-1">
                  {isRemoveOneItemPending ? (
                    <Loader2 className="w-5 animate-spin text-red-500" />
                  ) : (
                    <Trash2
                      className="text-red-500 cursor-pointer w-5"
                      onClick={() => {
                        removeOneItem({ id: item.id });
                      }}
                    />
                  )}
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
};

export default CartItem;
