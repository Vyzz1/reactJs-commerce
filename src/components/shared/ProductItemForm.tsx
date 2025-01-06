import { productItemSchema, ProductItemType } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import RenderFormField from "./RenderFormField";
import useFetchData from "@/hooks/useFetchData";
import RenderFormSelect from "./RenderFormSelect";
import { Button } from "../ui/button";

interface ProductItemFormProps {
  defaultValues?: ProductItemType;
  loading: boolean;
  className?: string;
  onSubmit: (data: ProductItemType) => void;
}

const ProductItemForm = ({
  loading,
  onSubmit,
  className,
  defaultValues,
}: ProductItemFormProps) => {
  const {
    data: sizes,
    isLoading: fetchingSize,
    isError: sizeError,
  } = useFetchData("/size/all", "", "normal");
  const form = useForm<ProductItemType>({
    resolver: zodResolver(productItemSchema),
    defaultValues,
  });
  if (fetchingSize) return <div>Loading...</div>;
  if (sizeError) return <div>Error...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <RenderFormField
          control={form.control}
          type="input"
          name="quantity"
          title="Quantity"
          inputType="number"
        />

        <RenderFormSelect
          control={form.control}
          name="productSizeId"
          title="Size"
          options={sizes}
          type="key-value"
          valueKey="id"
          displayKey="value"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductItemForm;
