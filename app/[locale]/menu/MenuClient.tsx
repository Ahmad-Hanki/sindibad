"use client";
import { useLocale } from "next-intl";
import ProductShow from "../(home)/_components/ProductShow";
import { useAllCategory } from "../dashboard/_api/get-all-categories";
import { useAllProducts } from "../dashboard/products/_api/get-all-products";

function MenuClient() {
  const { data } = useAllCategory({});
  const { data: products } = useAllProducts({});

  function filteredProducts(categoryId: string) {
    return products?.filter((product) => product.categoryId === categoryId);
  }
  const locale = useLocale();

  return (
    <div className="my-12">
      <h3
        className={` ${
          locale == "ar" ? " text-right " : " text-left "
        } text-5xl text-primary font-semibold mb-12 `}
      >
        {locale == "en" ? "Menu" : locale == "ar" ? "قائمة الطعام" : "Menü"}
      </h3>
      <section className="flex flex-col space-y-5">
        {data?.map((data) => (
          <div key={data.id} className="flex flex-col space-y-5">
            <h2 className="bg-primary text-3xl text-white font-semibold w-fit mx-auto px-12 py-3 rounded-lg">
              {locale === "en"
                ? data.name
                : locale == "ar"
                ? data.name_ar
                : data.name_tr}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
              {filteredProducts(data.id)?.map((product) => (
                <div key={product.id}>
                  <ProductShow  item={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MenuClient;
