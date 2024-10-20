"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const Cart = () => {
  const pathname = usePathname(); // Get the current pathname
  const getOnlyPathname = (): string => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return pathname.replace(/^\/(en|ar|tr)/, "/");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="relative h-fit">

          <ShoppingBasketIcon
            className={cn(
              getOnlyPathname() == "/" && "text-white",
              "transition-all duration-200  hover:text-primary/70 w-9 h-9 lg:w-8 lg:h-8"
            )}
          />

          {/* TODO: motion */}
          <div className="absolute -top-3 right-0">
            <span className="text-xs bg-primary text-white rounded-full px-1 py-0.5">
              3
            </span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
