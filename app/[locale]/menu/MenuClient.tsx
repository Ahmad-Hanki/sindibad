"use client";
import ProductShow from "../(home)/_components/ProductShow";
import { useAllCategory } from "../dashboard/_api/get-all-categories";
import { useAllProducts } from "../dashboard/_api/get-all-products";
import { useUser } from "@/server-actions/auth/get-user";

function MenuClient({ locale }: { locale: string }) {
  const { data } = useAllCategory({});
  const { data: products } = useAllProducts({});
  const { data: userData } = useUser({});

  function filteredProducts(categoryId: string) {
    return products?.filter((product) => product.categoryId === categoryId);
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts(data.id)?.map((product) => (
                <div key={product.id}>
                  <ProductShow
                    locale={locale}
                    item={product}
                    userData={userData}
                  />
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
