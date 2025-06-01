"use client";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Dispatch } from "react";
import { useCreateCategory } from "../_api/add-new-category";
import { useUpdateCategory } from "../_api/update-category";
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
import {
  FormCategorySchemaInput,
  getCategoryFormSchema,
} from "../_utils/formCategory-schemes";
import { GetAllCategoriesResponseType } from "@/server-actions/get/get-all-categories";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";
const CategoryForm = ({
  // open,
  initialData,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  initialData?: GetAllCategoriesResponseType;
}) => {
  const locale = useLocale();
  const form = useForm<FormCategorySchemaInput>({
    resolver: zodResolver(getCategoryFormSchema(locale)),
    defaultValues: {
      name: initialData?.name ?? "",
      name_ar: initialData?.name_ar ?? "",
      name_tr: initialData?.name_tr ?? "",
      slug: initialData?.slug ?? "",
    },
  });

  const { toast } = useToast();

  const { mutateAsync: addNewCategory, isPending: AddPending } =
    useCreateCategory({
      mutationConfig: {
        onSuccess: () => {
          toast({ title: "Category added successfully" });
          setOpen(false);
        },
      },
    });
  const { mutateAsync: editCategory, isPending: updatePending } =
    useUpdateCategory({
      mutationConfig: {
        onSuccess: () => {
          toast({ title: "Meal added successfully" });
          setOpen(false);
        },
      },
    });
  async function onSubmit(values: FormCategorySchemaInput) {
    if (initialData) {
      await editCategory({ data: values, id: initialData.id });
    } else {
      await addNewCategory({ data: values });
    }
  }

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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en" ? "Slug" : locale == "ar" ? "العيار" : "Slug"}
              </FormLabel>
              <FormControl>
                <Input {...field} />
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
              loading={AddPending || updatePending}
              submit={
                initialData
                  ? locale == "en"
                    ? "Update"
                    : locale == "ar"
                    ? "تحديث"
                    : "Güncelle"
                  : locale == "en"
                  ? "Add"
                  : locale == "ar"
                  ? "اضافة"
                  : "Ekle"
              }
              className="w-fit"
            />
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
