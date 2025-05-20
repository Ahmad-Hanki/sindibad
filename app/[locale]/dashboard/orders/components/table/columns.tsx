import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DropDownActions from "./delete-action";
import { GetAllOrdersResponseType } from "@/server-actions/get/get-all-orders";

export const enColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerLocation",
    header: "Customer Location",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "note",
    header: "Note",
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

export const trColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerLocation",
    header: "Customer Location",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "note",
    header: "Note",
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

export const arColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "customerName",
    header: () => <div className="text-right w-full">اسم العميل</div>, // Right-aligned header
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "customerLocation",
    header: () => <div className="text-right w-full">موقع العميل</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "orderItems",
    header: () => <div className="text-right w-full">عناصر الطلب</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right w-full">المبلغ الإجمالي</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "note",
    header: () => <div className="text-right w-full">ملاحظات</div>,
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
