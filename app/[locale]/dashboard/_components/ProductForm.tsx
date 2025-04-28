"use client";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { Dispatch, useState } from "react";
import UploadImage from "./uplaod-image";
import { useCreateMeal } from "../_api/add-new-meal";
import { useToast } from "@/hooks/use-toast";

const ProductForm = ({
  // open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const locale = useLocale();
  const { mutateAsync } = useCreateMeal({
    mutationConfig: {
      onSuccess: () => {
        toast({ title: "Meal added successfully" });
        setImageUrl(null);
        setOpen(false);
      },
    },
  });
  const addHAndler = async (FormData: FormData) => {
    const name = FormData.get("name") as string;
    ///....
    // add the meal name
    // add the meal description
    // add the meal image
    // add the meal price
    // add the meal category
    // add if the meal is most popular

    // check if no data is empty

    // and then add the meal

    const data = {
      name,
      description: "",
      image: imageUrl ?? "",
      price: 0,
      categoryId: "9ba5ff15-68e4-4e02-94e2-85ceeaad26c5", // hardcoded id for now
      mostPopular: true, // hardcoded for now
    };
    await mutateAsync({ data });
  };

  return (
    <div>
      <form action={addHAndler} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="name">
            {locale == "en" ? "Name" : locale == "ar" ? "الاسم" : "Adı"}
          </label>
          <Input type="text" name="name" className="text-lg" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="description">
            {locale == "en"
              ? "Description"
              : locale == "ar"
              ? "الوصف"
              : "Açıklama"}
          </label>
          <Input className="text-lg" type="text" name="description" />
        </div>

        <UploadImage
          setImage={setImageUrl}
          title={
            locale == "en"
              ? "Upload an Image"
              : locale == "ar"
              ? "ارفع صورة"
              : "Resim Yükle"
          }
        />

        {/* select section */}
        <div>
          <DialogFooter className="flex justify-between items-center gap-4">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              type="button"
              variant="secondary"
            >
              {locale == "en" ? "Cancel" : locale == "ar" ? "الغاء" : "İptal"}
            </Button>

            <SubmitButton
              type="submit"
              submit={
                locale == "en" ? "Add" : locale == "ar" ? "اضافة" : "Ekle"
              }
              className="w-fit"
              submitting={
                locale == "en"
                  ? "Adding"
                  : locale == "ar"
                  ? "جاري الاضافة"
                  : "Ekleniyor"
              }
            />
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
