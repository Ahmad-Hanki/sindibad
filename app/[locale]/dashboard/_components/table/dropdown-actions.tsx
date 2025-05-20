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
import ProductDialog from "../ProductDialog";
import { GetAllProductsResponseType } from "@/server-actions/get/get-all-producats";
// import { useDeleteMeal } from "../../_api/delete-meal";
import { DeleteConfirm } from "./DeleteConfirm";

const DropDownActions = ({ data }: { data: GetAllProductsResponseType }) => {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // const { mutateAsync } = useDeleteMeal({
  //   mutationConfig: {
  //     onSuccess: () => {},
  //   },
  // });

  return (
    <div>
      <ProductDialog
        setOpen={setOpen}
        locale={locale}
        open={open}
        initialData={data}
      />
      <DeleteConfirm
        open={deleteOpen}
        setOpen={setDeleteOpen}
        data={{ id: data.id }}
        local={locale}
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
            onClick={() => {
              setDeleteOpen(true);
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
