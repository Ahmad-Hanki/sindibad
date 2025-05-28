import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { useTranslations } from "next-intl";

const CartHeader = ({ userId }: { userId: string }) => {
  const t = useTranslations("cart");
  const { data: count } = useCartCount({
    userId: userId ?? "",
    queryConfig: {
      enabled: !!userId,
    },
  });
  return (
    <section className="p-3">
      <div className=" font-semibold text-xl ">
        {t("headerTitle")} ({count})
      </div>
    </section>
  );
};

export default CartHeader;
