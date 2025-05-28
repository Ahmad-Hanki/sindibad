"use client";

import { useUser } from "@/server-actions/auth/get-user";
import CartHeader from "./_components/cart-header";
import Container from "@/components/Container";
import CartProducts from "./_components/cart-products";

const CartClient = () => {
  const { data: userData } = useUser({});

  return (
    <Container>
      <CartHeader userId={userData!.id} />
      {/* todo: add the delete all cart ui */}
      <CartProducts userId={userData!.id} />
      
    </Container>
  );
};

export default CartClient;
