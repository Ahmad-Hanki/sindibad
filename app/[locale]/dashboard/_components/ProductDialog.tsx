"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch } from "react";
import ProductForm from "./ProductForm";
import { Product } from "@prisma/client";

interface HeaderProps {
  initialData?: Product;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const ProductDialog = ({ open, setOpen, 
  // initialData 

}: HeaderProps) => {
  return (
    <div>
      <Dialog open={open} modal={false}>
        {open && (
          <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
        )}
        <div>
          <DialogContent>
            <ProductForm open={open} setOpen={setOpen} />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDialog;
