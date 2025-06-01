import { useLocale } from "next-intl";
import { enColumns, arColumns, trColumns } from "./columns";
import { useAllProducts } from "../_api/get-all-products";
import { DataTable } from "../../_components/table/data-table";

const ProductsTables = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllProducts({});

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default ProductsTables;
