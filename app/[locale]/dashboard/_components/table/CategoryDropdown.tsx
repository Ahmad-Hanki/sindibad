import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useState } from "react";
import CategoryDialog from "../CategoryDialog";
import { GetAllCategoriesResponseType } from "@/server-actions/get/get-all-categories";
import { useDeleteCategory } from "../../_api/delete-category";

const DropDownActions = ({ data }: { data: GetAllCategoriesResponseType }) => {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const { mutateAsync } = useDeleteCategory({
    mutationConfig: {
      onSuccess: () => {},
    },
  });

  return (
    <div>
      <CategoryDialog
        setOpen={setOpen}
        locale={locale}
        open={open}
        initialData={data}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {locale == "en"
              ? "Actions"
              : locale == "tr"
              ? "Eylemler"
              : "الأفعال"}{" "}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            {locale == "en" ? "Edit" : locale == "tr" ? "Düzenle" : "تعديل"}{" "}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await mutateAsync({ CategoryId: data.id });
            }}
          >
            {locale == "en" ? "Delete" : locale == "tr" ? "Sil" : "حذف"}{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownActions;