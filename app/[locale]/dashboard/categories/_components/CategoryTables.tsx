import { useLocale } from "next-intl";
import {
  enColumns,
  arColumns,
  trColumns,
} from "./CategoryColumns";
import { useAllCategory } from "../../_api/get-all-categories";
import { DataTable } from "../../_components/table/data-table";

const CategoryTables = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllCategory({});
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

export default CategoryTables;
