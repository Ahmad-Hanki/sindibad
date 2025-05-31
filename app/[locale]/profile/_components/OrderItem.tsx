import { OrderItemWithProductType } from "@/server-actions/get/get-orders-data-action";
import { useTranslations } from "next-intl";
import Image from "next/image";

const OrderItem = ({ item }: { item: OrderItemWithProductType }) => {
  const t = useTranslations("cart");
  return (
    <section key={item.id}>
      <div className="p-4  border-b ">
        <div className="flex items-center gap-5 ">
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
          <div className="flex flex-col gap-1 break-all line-clamp-1 overflow-hidden">
            {/* Date Section */}
            <p className="text-sm text-gray-500">
              {" "}
              Order Date : {item.product.createdAt.toLocaleDateString()}
            </p>
            {/* Product Name */}
            <h1 className="text-lg ">{item.product.name}</h1>
            {/* Product Quantity */}
            <div className="text-sm text-gray-500 flex flex-col lg:flex-row items-center">
              <p> {t("quantity")}: </p>
              <div className="flex flex-col  break-all line-clamp-1 overflow-hidden">
                <p className=" text-black"> {item.quantity}</p>
              </div>
            </div>
            {/* Order Id Section */}
            <p className="text-sm text-gray-500"> Order Number : {item.id}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderItem;
