"use client";

import SubmitButton from "@/components/SubmitButton";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
import { getUserFormSchema, UserFormSchemaInput } from "../_utils/user-scheme";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/server-actions/auth/get-user";
import { PhoneInput } from "@/components/ui/phone-input";
import { useLocale } from "next-intl";
import { useUpdateUserData } from "../_api/edit-user-data";
const UserForm = () => {
  const { data } = useUser({});
  const locale = useLocale();
  const form = useForm<UserFormSchemaInput>({
    resolver: zodResolver(getUserFormSchema(locale)),
    defaultValues: {
      name: data?.name ?? "",
      address: data?.address ?? "",
      phone: "+90" + data?.phone,
      email: data?.email ?? "",
    },
  });

  const { toast } = useToast();

  const { mutate, isPending } = useUpdateUserData({
    mutationConfig: {
      onSuccess: () => {
        toast({
          title:
            locale == "en" ? "Success" : locale == "ar" ? "نجاح" : "Başarılı",
          description:
            locale == "en"
              ? "User data updated successfully"
              : locale == "ar"
              ? "تم تحديث بيانات المستخدم بنجاح"
              : "Kullanıcı verileri başarıyla güncellendi",
        });
        // setOpen(false);
      },

      onError: (error) => {
        toast({
          title: locale == "en" ? "Error" : locale == "ar" ? "خطأ" : "Hata",
          description:
            error.message ||
            (locale == "en"
              ? "Failed to update user data"
              : locale == "ar"
              ? "فشل في تحديث بيانات المستخدم"
              : "Kullanıcı verileri güncellenemedi"),
        });
      },
    },
  });

  async function onSubmit(values: UserFormSchemaInput) {
    const formattedData = {
      ...values,
      phone: values.phone?.startsWith("+90")
        ? values.phone.slice(3)
        : values.phone,
    };

    mutate({ data: formattedData, id: data?.id || "" });
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
                {locale == "en" ? " Name" : locale == "ar" ? "الاسم " : " Adı"}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Email"
                  : locale == "ar"
                  ? "البريد الإلكتروني"
                  : "E-posta "}
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* its the english name */}
                {locale == "en"
                  ? "Phone"
                  : locale == "ar"
                  ? "الهاتف"
                  : "Telefon"}
              </FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="TR" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* select section */}
        <div>
          <DialogFooter className="flex justify-between items-center gap-4">
            {/* <Button
              onClick={() => {
                setOpen(false);
              }}
              type="button"
              variant="secondary"
            >
              {locale == "en" ? "Cancel" : locale == "ar" ? "الغاء" : "İptal"}
            </Button> */}

            <SubmitButton
              type="submit"
              loading={isPending}
              submit={
                locale == "en" ? "Save" : locale == "ar" ? "حفظ" : "Kaydet"
              }
              className="w-fit"
            />
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
