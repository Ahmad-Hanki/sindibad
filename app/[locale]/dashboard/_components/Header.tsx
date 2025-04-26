"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Dispatch, ReactNode } from "react";

interface HeaderProps {
  title: string;
  children: ReactNode;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const Header = ({ title, children, open, setOpen }: HeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold flex-1 w-full ">{title}</h1>

        <Dialog open={open} modal={false}>
          {open && (
            <div className="fixed inset-0 z-30 h-screen w-full bg-black/80" />
          )}{" "}
          <DialogTrigger
            onClick={() => {
              setOpen(true);
            }}
            asChild
          >
            <Button>
              <Plus size={25} />
            </Button>
          </DialogTrigger>
          <div>
            <DialogContent>
              <div>{children}</div>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
