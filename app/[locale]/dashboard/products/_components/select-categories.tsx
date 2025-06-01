import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCategory } from "../../_api/get-all-categories";

export function SelectCategories({
  selectedCategoryId,
  onValueChange,
  locale,
}: {
  selectedCategoryId?: string;
  locale: string;
  onValueChange: (value: string) => void;
}) {
  const { data: categories } = useAllCategory({});

  return (
    <Select value={selectedCategoryId} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            locale === "en"
              ? "Select Category"
              : locale === "tr"
              ? "Kategori Seç"
              : locale === "ar"
              ? "اختر الفئة"
              : "Select Category"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {locale === "en"
                ? category.name
                : locale === "tr"
                ? category.name_tr
                : locale === "ar"
                ? category.name_ar
                : category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
