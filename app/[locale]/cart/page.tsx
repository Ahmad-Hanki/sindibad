import { HydrationBoundary } from "@tanstack/react-query";
import { preloadCartData } from "./_lib/preload-data";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CartClient from "./cart-client";

const CartPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const { dehydratedState } = await preloadCartData({
    userId: session.user.id,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <CartClient />
    </HydrationBoundary>
  );
};

export default CartPage;
