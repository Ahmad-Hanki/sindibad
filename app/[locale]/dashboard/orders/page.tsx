import React from "react";
import OrdersTables from "./components/table/orders-table";

function page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div>
      {" "}
      <section className="mb-24">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-lg font-semibold flex-1 w-full ">
            {locale == "en"
              ? "The Orders"
              : locale == "ar"
              ? "الطلبات"
              : "Siparişler"}
          </h1>
          <h1> </h1>
        </div>
        <OrdersTables />
      </section>
    </div>
  );
}

export default page;
