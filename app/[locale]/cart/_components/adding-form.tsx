"use client";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Dispatch } from "react";
import { useUpdateAddressToUser } from "../_api/update-addres-to-user";
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
import { FormUserSchemaInput, getUserFormSchema } from "../_utils/form-schemes";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";
import { useUser } from "@/server-actions/auth/get-user";
const AddingForm = ({
  // open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const locale = useLocale();
  const { data: initialData } = useUser({});
  const form = useForm<FormUserSchemaInput>({
    resolver: zodResolver(getUserFormSchema(locale)),
    defaultValues: {
      address: initialData?.address ?? "",
    },
  });

  const { toast } = useToast();

  const { mutateAsync: editAddress, isPending: updatePending } =
    useUpdateAddressToUser({
      userId: initialData?.id ?? "",
      mutationConfig: {
        onSuccess: () => {
          toast({ title: "Address updated successfully" });
          setOpen(false);
        },
      },
    });

  console.log("initialData", initialData);
  async function onSubmit(values: FormUserSchemaInput) {
    if (!initialData) {
      toast({ title: "User data not available", variant: "destructive" });
      return;
    }
    await editAddress({
      data: values,
      userId: initialData.id,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Address"
                  : locale == "ar"
                  ? "العنوان"
                  : "Adres"}
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
              loading={updatePending}
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

export default AddingForm;
