"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch } from "react";
import AddingForm from "./adding-form";


interface HeaderProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const AddressDialog = ({ open, setOpen }: HeaderProps) => {
  return (
    <div>
      <Dialog open={open} modal={false}>
        {open && (
          <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
        )}
        <div>
          <DialogContent className="max-w-[550px] max-h-[600px] overflow-y-auto">
            <AddingForm
              open={open}
              setOpen={setOpen}
            />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default AddressDialog;
