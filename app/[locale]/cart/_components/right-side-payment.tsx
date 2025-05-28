import { Button } from "@/components/ui/button";
import { PaymentIcon } from "@/public/icons/payment";
import { useUser } from "@/server-actions/auth/get-user";
import { CartDataType } from "@/server-actions/get/get-cart-data-action";
import { CreditCard, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOrderWithCreditCard } from "../_api/order-with-credit-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
const RightSidePayment = ({ cartData }: { cartData: CartDataType }) => {
  const { data: userData } = useUser({});
  const router = useRouter();
  const t = useTranslations("cart");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const price = cartData?.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

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

  return (
    <div className="w-1/2 bg-gray-100 border border-gray-100 p-5">
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">{t("subtotal")}</h2>
        <div className="flex justify-between mt-12">
          <p>{t("total")}</p>
          <p className="text-lg font-bold">₺ {price}</p>
          {/* todo: add shipping fees */}
          {/* todo: add total after shipping fees */}
        </div>
        <div className="w-full mt-16 space-y-4">
          <Button
            disabled={creditCardPending}
            onClick={() => {
              payWithCreditCard({
                cartData: cartData,
                email: userData!.email!,
                price: price!,
                userName: userData!.name!,
                userAddress: userData!.address!,
                userPhone: userData!.phone!,
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
          <Button className="w-full py-6 rounded-sm text-xl bg-blue-400">
            {t("payOnDelivery")} <PaymentIcon className="inline w-5 h-5 ml-2" />
          </Button>
        </div>
        {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
      </section>
    </div>
  );
};

export default RightSidePayment;
