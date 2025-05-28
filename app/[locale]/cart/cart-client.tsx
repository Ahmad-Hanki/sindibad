"use client";

import CartHeader from "./_components/cart-header";
import Container from "@/components/Container";
import CartProducts from "./_components/cart-products";

const CartClient = () => {

  return (
    <Container>
      <CartHeader  />
      {/* todo: add the delete all cart ui */}
      <CartProducts  />
      
    </Container>
  );
};

export default CartClient;
