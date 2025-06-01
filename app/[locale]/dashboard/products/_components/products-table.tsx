import { useLocale } from "next-intl";
import { enColumns, arColumns, trColumns } from "./columns";
import { useAllProducts } from "../_api/get-all-products";
import { DataTable } from "../../_components/table/data-table";

const ProductsTables = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllProducts({});
  const searchTableName =
    locale === "en" ? "name" : locale === "ar" ? "name_ar" : "name_tr";

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        searchTableName={searchTableName}
      />
    </div>
  );
};

export default ProductsTables;
