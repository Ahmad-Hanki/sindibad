"use client";
import React, { useState } from "react";
import ProductsTables from "./_components/table/products-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductDialog from "./_components/ProductDialog";
import CategoryDialog from "./_components/CategoryDialog";
import CategoryTables from "./_components/table/CategoryTables";

const DashboardClient = ({ locale }: { locale: string }) => {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  return (
    <div>
      <ProductDialog open={open} setOpen={setOpen} locale={locale} />
      <CategoryDialog
        open={categoryOpen}
        setOpen={setCategoryOpen}
        locale={locale}
      />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold flex-1 w-full ">
          {locale == "en"
            ? "Categories"
            : locale == "ar"
            ? "الفئات"
            : "Kategoriler"}
        </h1>
        <Button
          onClick={() => {
            setCategoryOpen(true);
          }}
        >
          <Plus size={25} />
        </Button>
      </div>
      <CategoryTables />
      <div className="flex items-center justify-between w-full mt-40">
        <h1 className="text-lg font-semibold flex-1 w-full ">
          {locale == "en"
            ? "The Products"
            : locale == "ar"
            ? "المنتجات"
            : "Ürünler"}
        </h1>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus size={25} />
        </Button>
      </div>
      <ProductsTables />
    </div>
  );
};

export default DashboardClient;
