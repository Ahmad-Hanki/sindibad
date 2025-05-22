import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useMostPopular } from "../_api/get-most-popular";
import { Button } from "@/components/ui/button";
import { useUser } from "@/server-actions/auth/get-user";
import Link from "next/link";
import { useAddItemToCart } from "../_api/post-add-to-cart";
import { Loader2 } from "lucide-react";

interface RecommendedProps {
  recommended: string;
}

// need to be reworked

const Recommended = ({ recommended }: RecommendedProps) => {
  const { data: list } = useMostPopular({});
  const { data: userData } = useUser({});

  const { mutate, isPending } = useAddItemToCart({
    userId: userData?.id ?? "",

    mutationConfig: {},
  });

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
                      <div className="h-full relative flex justify-center items-center">
                        <div className="absolute w-[90%] bg-primary/70 h-[30%] rounded-full -z-0" />

                        <div className="absolute w-full  z-30 flex justify-center items-center">
                          <div className="w-[70%] aspect-square relative overflow-hidden rounded-2xl  ">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className=" object-center transition-all duration-500 hover:scale-110"
                            />
                          </div>
                        </div>

                        <div className="absolute h-[95%] w-[70%] z-10 flex justify-start items-end">
                          <p className="text-xl font-semibold">{item.name}</p>
                          {userData?.id ? (
                            <Button
                              disabled={isPending}
                              onClick={() => {
                                mutate({
                                  productId: item.id,
                                  userId: userData.id,
                                });
                              }}
                            >
                              {isPending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                "Add to cart"
                              )}
                            </Button>
                          ) : (
                            <Link href={"/sign-in"}>
                              <Button>Add to cart</Button>
                            </Link>
                          )}
                        </div>
                      </div>
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
