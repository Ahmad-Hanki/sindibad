import { ColumnDef } from "@tanstack/react-table";
import DropDownActions from "./CategoryDropdown";
import { GetAllCategoriesResponseType } from "@/server-actions/get/get-all-categories";

export const enColumns: ColumnDef<GetAllCategoriesResponseType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    header: () => <div className=" flex justify-end">Actions</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-end">
          <DropDownActions data={data} />
        </div>
      );
    },
  },
];

export const trColumns: ColumnDef<GetAllCategoriesResponseType>[] = [
  {
    accessorKey: "name_tr",
    header: "İsim",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    header: () => <div className=" flex justify-end">İşlemler</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-end">
          <DropDownActions data={data} />
        </div>
      );
    },
  },
];

export const arColumns: ColumnDef<GetAllCategoriesResponseType>[] = [
  {
    accessorKey: "name_ar",
    header: () => <div className="text-right w-full">الاسم</div>, // Right-aligned header
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: () => <div className="text-right w-full">العينة</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className=" w-full">الإجراءات</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-end">
          <DropDownActions data={data} />
        </div>
      );
    },
  },
];
