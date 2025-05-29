"use client";
import React, { useState } from "react";
import ProductsTables from "../_components/table/products-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductDialog from "../_components/ProductDialog";

const DashboardClient = ({ locale }: { locale: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ProductDialog open={open} setOpen={setOpen} locale={locale} />
      {/* Products Section */}
      <section className="mb-24">
        <div className="flex items-center justify-between w-full ">
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
      </section>
    </div>
  );
};

export default DashboardClient;