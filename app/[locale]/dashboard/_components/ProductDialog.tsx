"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch } from "react";
import ProductForm from "./ProductForm";
import { Product } from "@prisma/client";

interface HeaderProps {
  initialData?: Product;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  locale: string;
  open: boolean;
}

const ProductDialog = ({
  open,
  locale,

  setOpen,
}: // initialData

HeaderProps) => {
  return (
    <div>
      <Dialog open={open} modal={false}>
        {open && (
          <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
        )}
        <div>
          <DialogContent className="max-w-[550px] max-h-[600px] overflow-y-auto">
            <ProductForm open={open} setOpen={setOpen} locale={locale} />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDialog;
