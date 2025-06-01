import { ColumnDef } from "@tanstack/react-table";
import { GetAllOrdersResponseType } from "@/server-actions/get/get-all-order-actions";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
export function getCurrentYMD(yr: Date) {
  const year = yr.getFullYear();
  const month = String(yr.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(yr.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const enColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "randomId",
    header: () => (
      <div className="text-start w-full min-w-[120px]">Order Id</div>
    ),
  },
  {
    id: "Image",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Image</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-3">
          {data.orderItems.map((item, ix) => (
            <Image
              key={ix}
              src={item.product.image}
              width={50}
              height={50}
              alt="Product Image"
            />
          ))}
        </div>
      );
    },
  },
  {
    id: "quantity",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Quantity</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col justify-between gap-3">
          {" "}
          {data.orderItems.map((item, ix) => (
            <div key={ix} className="h-[50px] grid place-content-center">
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "productName",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Product Name</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col justify-between gap-3">
          {data.orderItems.map((item, ix) => (
            <div key={ix} className="h-[50px] grid place-content-center">
              <p>{item.product.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "Price",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Price</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col justify-between gap-3">
          {data.orderItems.map((item, ix) => (
            <div key={ix} className="h-[50px] grid place-content-center">
              <p>
                {item.product.price} x {item.quantity}
              </p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => (
      <div className="text-start w-full min-w-[120px]">Full Price</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-start w-full min-w-[120px]">Status</div>,
  },
  {
    id: "date",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Dat6e</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return <div>{getCurrentYMD(data.createdAt)}</div>;
    },
  },
  {
    accessorKey: "userAddress",
    header: () => (
      <div className="text-start w-full min-w-[120px]">Address</div>
    ),
  },
  {
    accessorKey: "userPhone",
    header: () => <div className="text-start w-full min-w-[120px]">Phone</div>,
  },
  {
    accessorKey: "userName",
    header: () => <div className="text-start w-full min-w-[120px]">Name</div>,
  },

  {
    id: "details",
    header: () => (
      <div className="text-start max-w-[250px] min-w-[120px]">Details</div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div>
          <Link href={`/dashboard/orders/findOrder/${data.randomId}`}>
            <Eye size={24} />
          </Link>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   header: () => (
  //     <div className="text-start w-full min-w-[120px]">Actions</div>
  //   ),
  //   cell: ({ row }) => {
  //     const data = row.original;
  //     return <StatusRadio orderId={data.id} statusOrder={data.status} />; // dropdown
  //   },
  // },
];

export const trColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "randomId",
    header: "Sipariş ID",
  },
];

export const arColumns: ColumnDef<GetAllOrdersResponseType>[] = [
  {
    accessorKey: "randomId",
    header: () => <div className="text-right w-full">رقم الطلب</div>, // Right-aligned header
    cell: ({ getValue }) => (
      <div className="text-right">{getValue() as string}</div>
    ),
  },
];
