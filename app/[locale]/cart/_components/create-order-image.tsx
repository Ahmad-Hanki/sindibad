import { useUser } from "@/server-actions/auth/get-user";
import { useAllCartData } from "../_api/get-cart-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forwardRef, useImperativeHandle, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreateOrderImageProps {
  price: number;
  shippingFee?: number;
  randomId: string;
}

export type CreateOrderImageRef = {
  generateImage: () => Promise<string | null>;
};


const CreateOrderImage = forwardRef<CreateOrderImageRef, CreateOrderImageProps>(
  ({ price, shippingFee = 0, randomId }, ref) => {
    const imageRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      async generateImage() {
        if (!imageRef.current) return null;

        const canvas = await html2canvas(imageRef.current, {
          backgroundColor: "#fff",
          scale: 2,
        });

        return canvas.toDataURL("image/png");
      },
    }));

    const { data: userData } = useUser({});
    const { data } = useAllCartData({
      userId: userData?.id ?? "",
      queryConfig: { enabled: !!userData?.id },
    });

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const restaurantName = "Sindibad Lokantası";
    const restaurantLocation = userData?.address || "İstanbul"; // Default to Istanbul if no address is provided
    const restaurantPhone = userData?.phone || "+90 534 927 77 44";

    return (
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          left: "-9999px", // Move far off-screen
          top: "-9999px",
          width: "500px", // Explicit width (matches your card)
          visibility: "visible", // Must be visible for html2canvas
        }}
      >
        <div className="mx-auto max-w-[500px]">
          <Card className="flex flex-col  ">
            <CardHeader className="text-center">
              <CardTitle>{restaurantName}</CardTitle>
              <CardDescription>{restaurantLocation}</CardDescription>
              <CardDescription>{restaurantPhone}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col pb-4 gap-2 justify-between">
                <p className="text-sm text-gray-500">رقم الطلب: {randomId}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>

              <Table>
                <TableCaption className="py-3">شكرًا لك</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">الفهرس</TableHead>
                    <TableHead>العدد</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.cartItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.product.name_ar}</TableCell>
                      <TableCell className="text-right">
                        ₺{item.quantity * item.product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">
                      {(data?.cartItems?.length ?? 0) + 1}
                    </TableCell>
                    <TableCell>{1}</TableCell>
                    <TableCell>رسوم التوصيل</TableCell>
                    <TableCell className="text-right">₺{shippingFee}</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>المجموع</TableCell>
                    <TableCell className="text-right">
                      ₺{price + shippingFee}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

export default CreateOrderImage;
CreateOrderImage.displayName = "CreateOrderImage";
