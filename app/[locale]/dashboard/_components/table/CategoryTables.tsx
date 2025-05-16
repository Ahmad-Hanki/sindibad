import { useLocale } from "next-intl";
import { enColumns, arColumns, trColumns } from "./CategoryColumns";
import { CategoryDataTable } from "./CategoryDataTable";
import { useAllCategory } from "../../_api/get-all-categories";

const CategoryTables = () => {
  const locale = useLocale();
  const columns =
    locale === "en" ? enColumns : locale === "ar" ? arColumns : trColumns;
  const { data } = useAllCategory({});

  return (
    <div>
      <CategoryDataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default CategoryTables;