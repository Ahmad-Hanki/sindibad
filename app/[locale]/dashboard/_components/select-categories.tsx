import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCategory } from "../_api/get-all-categories";

export function SelectCategories({
  selectedCategoryId,
  onValueChange,
}: {
  selectedCategoryId?: string;
  onValueChange: (value: string) => void;
}) {
  const { data: categories } = useAllCategory({});
  const selectedCategory = categories?.find(
    (category) => category.id === selectedCategoryId
  );

  return (
    <Select value={selectedCategoryId} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category">
          {selectedCategory?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
