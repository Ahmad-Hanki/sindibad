"use client";

import { useTranslations } from "next-intl";
import CategoryTables from "../categories/_components/CategoryTables";
import OrderTable from "./_components/order-table";

const OrderClient = () => {
  const t = useTranslations("dashboardOrder");
  return (
    <div>
      <section className="mb-20 mt-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-semibold flex-1 w-full ">
            {t("headerTitle")}
          </h1>
        </div>
        <OrderTable />
      </section>
    </div>
  );
};

export default OrderClient;
