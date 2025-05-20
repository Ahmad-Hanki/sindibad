"use client";

import { Trash2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { GetAllOrdersResponseType } from "@/server-actions/get/get-all-orders";
// import { useDeleteMeal } from "../../_api/delete-meal";
import { DeleteConfirm } from "./DeleteConfirm";
import { Button } from "@/components/ui/button";

const DropDownActions = ({ data }: { data: GetAllOrdersResponseType }) => {
  const locale = useLocale();
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <div>
      <DeleteConfirm
        open={deleteOpen}
        setOpen={setDeleteOpen}
        data={{ id: data.id }}
        local={locale}
      />
      <Button onClick={() => setDeleteOpen(true)}>
        <Trash2 className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default DropDownActions;
