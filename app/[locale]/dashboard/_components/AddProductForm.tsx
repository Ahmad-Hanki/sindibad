"use client";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { Dispatch, useState } from "react";
import UploadImage from "./uplaod-image";

const AddProductForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const locale = useLocale();
  const addHAndler = async (FormData: FormData) => {};

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
        <div className="flex justify-between items-center gap-4">
          <DialogClose
            onClick={() => {
              setOpen(false);
            }}
            asChild
          >
            <Button type="button" variant="secondary" className="text-lg w-fit">
              {locale == "en" ? "Cancel" : locale == "ar" ? "الغاء" : "İptal"}
            </Button>
          </DialogClose>

          <SubmitButton
            type="submit"
            submit={locale == "en" ? "Add" : locale == "ar" ? "اضافة" : "Ekle"}
            className="w-fit"
            submitting={
              locale == "en"
                ? "Adding"
                : locale == "ar"
                ? "جاري الاضافة"
                : "Ekleniyor"
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
