"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  children: ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold flex-1 w-full ">{title}</h1>

        <Dialog>
          <DialogTrigger asChild>
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
