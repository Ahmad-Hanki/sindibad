import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DropDownActions from "./dropdown-actions";
import { GetAllProductsResponseType } from "@/server-actions/get/get-all-producats";


export const enColumns: ColumnDef<GetAllProductsResponseType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Image
          src={image}
          alt="product image"
          className="object-cover rounded-md"
          width={50}
          height={50}
        />
      );
    },
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

export const trColumns: ColumnDef<GetAllProductsResponseType>[] = [
  {
    accessorKey: "name_tr",
    header: "İsim",
  },
  {
    accessorKey: "description_tr",
    header: "Açıklama",
  },
  {
    accessorKey: "price",
    header: "Fiyat",
  },
  {
    accessorKey: "categoryName",
    header: "Kategori",
  },
  {
    accessorKey: "image",
    header: "Görsel",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Image
          src={image}
          alt="ürün görseli"
          className="object-cover rounded-md"
          width={50}
          height={50}
        />
      );
    },
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

export const arColumns: ColumnDef<GetAllProductsResponseType>[] = [
  {
    accessorKey: "name_ar",
    header: () => <div className="text-right w-full">الاسم</div>, // Right-aligned header
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "description_ar",
    header: () => <div className="text-right w-full">الوصف</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right w-full">السعر</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: () => <div className="text-right w-full">الفئة</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "image",
    header: () => <div className="text-right w-full">صورة</div>,
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div>
          <Image
            src={image}
            alt="صورة المنتج"
            className="object-cover rounded-md"
            width={50}
            height={50}
          />
        </div>
      );
    },
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
