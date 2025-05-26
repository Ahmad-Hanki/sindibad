import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const CartHeader = ({ userId }: { userId: string }) => {
  const t = useTranslations("Cart");
  const { data: count } = useCartCount({
    userId: userId ?? "",
    queryConfig: {
      enabled: !!userId,
    },
  });
  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>{t("headerTitle")} ({count} {t("item")})</CardTitle>
      </CardHeader>{" "}
    </Card>
  );
};

export default CartHeader;
