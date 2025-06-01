"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryDialog from "./_components/CategoryDialog";
import CategoryTables from "./_components/CategoryTables";
import { useTranslations } from "next-intl";

const CategoriesClient = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const t = useTranslations("dashboardCategory");
  return (
    <div>
      <CategoryDialog
        open={categoryOpen}
        setOpen={setCategoryOpen}
      />
      {/* Category Section */}
      <section className="mb-20 mt-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-semibold flex-1 w-full ">
            {t("headerTitle")}
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
      </section>
    </div>
  );
};

export default CategoriesClient;
