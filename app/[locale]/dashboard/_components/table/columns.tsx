import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DropDownActions from "./dropdown-actions";

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  image: string;
}
export const enColumns: ColumnDef<Product>[] = [
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
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return <DropDownActions data={data} />;
    },
  },
];

export const trColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "description",
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
    header: "İşlemler",
    cell: ({ row }) => {
      const data = row.original;
      return <DropDownActions data={data} />;
    },
  },
];

export const arColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "description",
    header: "الوصف",
  },
  {
    accessorKey: "price",
    header: "السعر",
  },
  {
    accessorKey: "categoryName",
    header: "الفئة",
  },
  {
    accessorKey: "image",
    header: "صورة",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Image
          src={image}
          alt="صورة المنتج"
          className="object-cover rounded-md"
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "الإجراءات",
    cell: ({ row }) => {
      const data = row.original;
      return <DropDownActions data={data} />;
    },
  },
];
