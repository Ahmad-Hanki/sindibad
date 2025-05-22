"use client";
import { useAllCategory } from "../dashboard/_api/get-all-categories";


function MenuClient({ locale }: { locale: string }) {
  const { data } = useAllCategory({});

  return (
    <div className="my-12">
      <h3
        className={` ${
          locale == "ar" ? " text-right " : " text-left "
        } text-5xl text-red-900 `}
      >
        {locale == "en" ? "Menu" : locale == "ar" ? "قائمة الطعام" : "Menü"}
      </h3>
      <section className="flex flex-col space-y-5">
        {data?.map((data) => (
          <div key={data.id}>{locale === "en" ? data.name : data.name_ar}</div>
        ))}
      </section>
    </div>
  );
}

export default MenuClient;
