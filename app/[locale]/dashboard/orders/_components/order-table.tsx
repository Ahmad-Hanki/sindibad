import { useLocale } from "next-intl";

import { DataTable } from "../../_components/table/data-table";
import { useAllOrders } from "../_api/get-all-orders";
import { arColumns, enColumns, trColumns } from "./OrderColumns";

const OrderTable = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllOrders({});

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        searchTableName="randomId"
      />
    </div>
  );
};

export default OrderTable;
