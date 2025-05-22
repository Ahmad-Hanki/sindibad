"use client";
import { useAllCategory } from "../dashboard/_api/get-all-categories";
import { useAllProducts } from "../dashboard/_api/get-all-products";

function MenuClient({ locale }: { locale: string }) {
  const { data } = useAllCategory({});
  const { data: products } = useAllProducts({});

  function filteredProducts(categoryId: string) {
    return products?.filter((product) => product.categoryId === categoryId);
  }

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
          <div key={data.id} className="flex flex-col space-y-5">
            <h2>
              {locale === "en"
                ? data.name
                : locale == "ar"
                ? data.name_ar
                : data.name_tr}
              <h3>
                {filteredProducts(data.id)?.map((product) => (
                  <div key={product.id}>{product.name_ar}</div>
                ))}
              </h3>
            </h2>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MenuClient;
