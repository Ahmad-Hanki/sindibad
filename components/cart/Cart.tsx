"use client";

import { useUser } from "@/server-actions/auth/get-user";

import { cn } from "@/lib/utils";
import { ShoppingBasketIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartCount } from "../navbar/_api/get-product-count";
import Link from "next/link";

const Cart = () => {
  const pathname = usePathname(); // Get the current pathname
  const getOnlyPathname = (): string => {
    // Replace the current locale part (whether 'en', 'ar', or 'tr') with the new locale
    return pathname.replace(/^\/(en|ar|tr)/, "/");
  };
  const { data: userData } = useUser({});
  const { data: count, isFetching } = useCartCount({
    userId: userData?.id ?? "",
    queryConfig: {
      enabled: !!userData?.id,
    },
  });

  return (
    <div>
      <Link href={"/cart"} className="relative h-fit">
        <ShoppingBasketIcon
          className={cn(
            getOnlyPathname() == "/" && "text-white",
            "transition-all duration-200  hover:text-primary/70 w-7 h-7 lg:w-8 lg:h-8"
          )}
        />

        {!isFetching && count && count > 0 ? (
          <div className="absolute -top-3 right-0">
            <span className="text-xs bg-primary text-white rounded-full px-1 py-0.5">
              {count}
            </span>
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default Cart;
