"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductDialog from "./_components/ProductDialog";
import ProductsTables from "./_components/products-table";
import { useTranslations } from "next-intl";

const ProductClient = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("dashboardProduct");

  return (
    <div>
      <ProductDialog open={open} setOpen={setOpen} />
      {/* Products Section */}
      <section className="mb-24">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-lg font-semibold flex-1 w-full ">
            {t("headerTitle")}
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

export default ProductClient;
