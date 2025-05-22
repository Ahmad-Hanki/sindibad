import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAllProducts } from "../../dashboard/_api/get-all-products";
import { useUser } from "@/server-actions/auth/get-user";
import ProductShow from "./ProductShow";

interface RecommendedProps {
  recommended: string;
}

// need to be reworked

const Recommended = ({ recommended }: RecommendedProps) => {
  const { data: list } = useAllProducts({});
  const { data: userData } = useUser({});

  console.log(list);

  return (
    <div className="mt-[calc(100vh-112px)] py-20">
      <h2 className="pb-10 text-5xl font-semibold text-center">
        {recommended}
      </h2>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "center",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full px-0 max-w-[90rem]"
        >
          <CarouselContent>
            {list?.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-primary border-4 rounded-2xl ">
                    <CardContent className="aspect-square p-0">
                      <ProductShow item={item} userData={userData} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Recommended;
