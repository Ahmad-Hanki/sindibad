import { Button } from "@/components/ui/button";
import { PaymentIcon } from "@/public/icons/payment";
import { useUser } from "@/server-actions/auth/get-user";
import { CartDataType } from "@/server-actions/get/get-cart-data-action";
import { CreditCard, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOrderWithCreditCard } from "../_api/order-with-credit-card";
import { useState } from "react";
import { useRef } from "react";
import CreateOrderImage, { CreateOrderImageRef } from "./create-order-image";
import { useUploadImageToCloudinary } from "../_api/upload-image-to-cloudinary";
import { useRouter } from "@bprogress/next";
import { generateId } from "@/lib/idGenerater";

const RightSidePayment = ({ cartData }: { cartData: CartDataType }) => {
  const { data: userData } = useUser({});
  const router = useRouter();
  const t = useTranslations("cart");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const price = cartData?.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const shipping_fee = price >= 200 ? 0 : 20; // Example shipping fee logic

  const orderImageRef = useRef<CreateOrderImageRef>(null);

  const randomId = generateId().toLocaleUpperCase();

  const handleGenerateAndSend = async () => {
    await payOnDelivery({
      imageRef: orderImageRef,
      cartData,
      price,
      randomId,
      shipping_fee,
    });
  };

  const { mutate: payWithCreditCard, isPending: creditCardPending } =
    useOrderWithCreditCard({
      userId: userData!.id!,
      mutationConfig: {
        onSuccess: (data) => {
          if (data.status == "success") {
            router.push(`/checkoutForm`);
          }
        },
        onError: (error) => {
          setPaymentError(
            error instanceof Error
              ? error.message
              : "Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin."
          );
        },
      },
    });
  const { mutateAsync: payOnDelivery, isPending: payWithDeliveryPending } =
    useUploadImageToCloudinary({
      userId: userData!.id!,
      mutationConfig: {
        onSuccess: (result) => {
          const phoneNumber = "+905349277744"; // Your restaurant's WhatsApp number
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const imageUrl = result.secure_url; // Cloudinary image URL
          const message = `Sipariş onayı\nSipariş detayları: ${imageUrl}`;
          const encodedMessage = encodeURIComponent(message);

          window.open(
            `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
            "_blank"
          );
        },
        onError: (error) => {
          console.error("Upload failed:", error);
          setPaymentError(
            error instanceof Error
              ? error.message
              : "Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin."
          );
        },
      },
    });

  return (
    <div className="w-1/2 bg-gray-100 border border-gray-100 p-5">
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">{t("subtotal")}</h2>
        <p className="text-gray-600 text-sm">{t("subtotalDescription")}</p>
        {/* price */}
        <div className="flex justify-between mt-12">
          <p className="text-gray-600">{t("total")}</p>
          <p className="text-md text-gray-600">₺ {price}</p>
        </div>
        {/* Shipping Fee */}
        <div className="flex justify-between mt-4">
          <p className="text-gray-600">{t("shipping")}</p>
          <p className="text-md text-gray-600">
            {shipping_fee == 0 ? t("shippingFree") : "₺ " + shipping_fee}
          </p>
        </div>
        {/* Total Amount */}
        <div className="flex justify-between mt-8">
          <p className="font-semibold">{t("total")}</p>
          <p className="text-lg font-bold">₺ {price + shipping_fee}</p>
        </div>
        {/* {todo: before the user pay, check from useUser if the phone and address are not null, if so then use this to update the user data}
          
          // todo:
      <DialogUserData open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)} className="w-full">
        Open
      </Button> 

      use it in a separate component to update the user data before payment
      
      also if there is data, show the user address in the top, and make a button to the user if he wants to change the address

          */}
        <div className="w-full mt-16 space-y-4">
          <Button
            disabled={creditCardPending}
            onClick={() => {
              payWithCreditCard({
                cartData: cartData,
                email: userData!.email!,
                price,
                randomId,
                userName: userData!.name!,
                userAddress: userData!.address!,
                userPhone: userData!.phone!,
                shipping_fee,
              });
            }}
            className="w-full py-6 rounded-sm text-xl"
          >
            {creditCardPending ? (
              <Loader2 className="animate-spin w-4" />
            ) : (
              t("checkout")
            )}{" "}
            <CreditCard className="inline w-5 h-5 ml-2" />
          </Button>
          <Button
            disabled={payWithDeliveryPending}
            onClick={handleGenerateAndSend}
            className="w-full py-6 rounded-sm text-xl bg-blue-400"
          >
            {payWithDeliveryPending ? (
              <Loader2 className="animate-spin w-4" />
            ) : (
              t("payOnDelivery")
            )}{" "}
            <PaymentIcon className="inline w-5 h-5 ml-2" />{" "}
          </Button>
        </div>
        {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
      </section>

      {/* Invisible component */}
      <CreateOrderImage
        ref={orderImageRef}
        price={price}
        shippingFee={shipping_fee}
        randomId={randomId}
      />
    </div>
  );
};

export default RightSidePayment;
