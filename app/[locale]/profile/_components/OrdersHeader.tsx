import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { useUser } from "@/server-actions/auth/get-user";
import { useTranslations } from "next-intl";

function OrdersHeader() {
  const t = useTranslations("profile");
  const { data: userData } = useUser({});
  const { data: count } = useCartCount({
    userId: userData?.id ?? "",
  });
  return (
    <section className="p-3">
      <div className=" font-semibold text-xl ">{t("headerTitle")} ({count})</div>
    </section>
  );
}

export default OrdersHeader;
