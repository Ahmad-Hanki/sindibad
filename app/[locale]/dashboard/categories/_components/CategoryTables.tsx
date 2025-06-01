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

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default CategoryTables;
