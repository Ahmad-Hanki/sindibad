import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

const RightSidePayment = ({ price }: { price: number }) => {
  const t = useTranslations("cart");

  return (
    <div className="w-1/2 h-[300px] bg-gray-100 border border-gray-100 p-5">
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">{t("subtotal")}</h2>
        <div className="flex justify-between mt-12">
          <p>{t("total")}</p>
          <p className="text-lg font-bold">₺ {price}</p>
        </div>
        <div className="w-full mt-16">
          <Button asChild className="w-full py-6 rounded-sm">
            <Link href={"/odeme"} className="text-xl">
              {t("checkout")} <span className="ml-4 ">{">"}</span>{" "}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RightSidePayment;
