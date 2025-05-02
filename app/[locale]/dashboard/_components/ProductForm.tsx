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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSchemaInput, getProductFormSchema } from "../_utils/form-schemes";
import { Textarea } from "@/components/ui/textarea";
import { SelectCategories } from "./select-categories";
const ProductForm = ({
  // open,
  setOpen,
  locale,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  locale: string;
}) => {
  const form = useForm<FormSchemaInput>({
    resolver: zodResolver(getProductFormSchema(locale)),
    defaultValues: {},
  });
  // THIS FORM WILL CHANGES TO REACT FORM
  const { toast } = useToast();

  const { mutateAsync } = useCreateMeal({
    mutationConfig: {
      onSuccess: () => {
        toast({ title: "Meal added successfully" });
        setOpen(false);
      },
    },
  });
  async function onSubmit(values: FormSchemaInput) {
    await mutateAsync({ data: values });
  }

  console.log(form.getValues().categoryId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "English Name"
                  : locale == "ar"
                  ? "الاسم الانجليزي"
                  : "İngilizce Adı"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Arabic Name"
                  : locale == "ar"
                  ? "الاسم العربي"
                  : "Arapça Adı"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_tr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Turkish Name"
                  : locale == "ar"
                  ? "الاسم التركي"
                  : "Türkçe Adı"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "English Description"
                  : locale == "ar"
                  ? "الوصف الانجليزي"
                  : "İngilizce Açıklama"}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Arabic Description"
                  : locale == "ar"
                  ? "الوصف العربي"
                  : "Açıklama (Arapça)"}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descrıptıon_tr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Turkish Description"
                  : locale == "ar"
                  ? "الوصف التركي"
                  : "Türkçe Açıklama"}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Description"
                  : locale == "ar"
                  ? "الوصف"
                  : "Açıklama"}
              </FormLabel>
              <FormControl>
                <SelectCategories onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en" ? "Price" : locale == "ar" ? "السعر" : "Fiyat"}
              </FormLabel>
              <FormControl>
                {/* I need an input that accepts only numbers. and accept only 2 decimals */}
                <Input
                  type="number"
                  step={0.01}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      field.onChange(value); // or null/undefined if you prefer
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue)) {
                        field.onChange(numValue);
                      }
                    }
                  }}
                  value={field.value ?? ""} // Handles null/undefined cases
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en" ? "Image" : locale == "ar" ? "الصورة" : "Resim"}
              </FormLabel>
              <FormControl>
                <UploadImage
                  setImage={field.onChange}
                  title={
                    locale == "en"
                      ? "Upload an Image"
                      : locale == "ar"
                      ? "ارفع صورة"
                      : "Resim Yükle"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
    </Form>
  );
};

export default ProductForm;
