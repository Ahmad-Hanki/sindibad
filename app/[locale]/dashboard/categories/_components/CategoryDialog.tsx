"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch } from "react";
import CategoryForm from "./CategoryForm";
import { GetAllCategoriesResponseType } from "@/server-actions/get/get-all-categories";

interface HeaderProps {
  initialData?: GetAllCategoriesResponseType;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  locale: string;
  open: boolean;
}

const CategoryDialog = ({
  open,
  locale,
  initialData,
  setOpen,
}: HeaderProps) => {
  return (
    <div>
      <Dialog open={open} modal={false}>
        {open && (
          <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
        )}
        <div>
          <DialogContent className="max-w-[550px] max-h-[600px] overflow-y-auto">
            <CategoryForm
              open={open}
              setOpen={setOpen}
              locale={locale}
              initialData={initialData}
            />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default CategoryDialog;
