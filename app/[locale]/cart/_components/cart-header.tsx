import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { useUser } from "@/server-actions/auth/get-user";
import { useTranslations } from "next-intl";

const CartHeader = () => {
  const { data: userData } = useUser({});

  const t = useTranslations("cart");
  const { data: count } = useCartCount({
    userId: userData?.id ?? "",
    queryConfig: {
      enabled: !!userData?.id,
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
