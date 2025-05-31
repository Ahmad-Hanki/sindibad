"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryDialog from "./_components/CategoryDialog";
import CategoryTables from "./_components/table/CategoryTables";

const DashboardClient = ({ locale }: { locale: string }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  return (
    <div>
      <CategoryDialog
        open={categoryOpen}
        setOpen={setCategoryOpen}
        locale={locale}
      />
      {/* Category Section */}
      <section className="mb-20 mt-5">
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
      </section>
    </div>
  );
};

export default DashboardClient;