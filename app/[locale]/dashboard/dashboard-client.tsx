"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import AddProductForm from "./_components/AddProductForm";
import ProductsTables from "./_components/table/products-table";

const DashboardClient = ({ locale }: { locale: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header
        setOpen={setOpen}
        open={open}
        title={
          locale == "en"
            ? "The Products"
            : locale == "ar"
            ? "المنتجات"
            : "Ürünler"
        }
      >
        <AddProductForm open={open} setOpen={setOpen} />
      </Header>

      <ProductsTables />
    </div>
  );
};

export default DashboardClient;
