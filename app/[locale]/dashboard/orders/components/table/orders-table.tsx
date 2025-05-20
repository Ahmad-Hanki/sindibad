import { useLocale } from "next-intl";
import { enColumns, arColumns, trColumns } from "./columns";
import { DataTable } from "./data-table";
import { useAllOrders } from "../../_api/get-all-orders";

const OrdersTables = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllOrders({});

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default OrdersTables;
