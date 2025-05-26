import { useCartCount } from "@/components/navbar/_api/get-product-count";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const CartHeader = ({ userId }: { userId: string }) => {
  const { data: count } = useCartCount({
    userId: userId ?? "",
    queryConfig: {
      enabled: !!userId,
    },
  });
  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>Sepetim ({count} Ürün)</CardTitle>
      </CardHeader>{" "}
    </Card>
  );
};

export default CartHeader;
