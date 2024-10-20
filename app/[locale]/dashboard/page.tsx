import Container from "@/components/Container";
import Header from "./_components/Header";
import AddProductForm from "./_components/AddProductForm";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <div className="w-full">
      <Container>
        <Header
          title={
            locale == "en"
              ? "The Products"
              : locale == "ar"
              ? "المنتجات"
              : "Ürünler"
          }
        >
          
          <AddProductForm/>
        </Header>
      </Container>
    </div>
  );
};

export default page;
