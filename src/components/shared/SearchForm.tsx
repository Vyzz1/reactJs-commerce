import { cn } from "@/lib/utils";
import { searchSchema, SearchType } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import RenderFormField from "./RenderFormField";
import useFetchData from "@/hooks/useFetchData";
import RenderFormSelect from "./RenderFormSelect";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

type SearchFormProps = {
  className?: string;
  defaultValues?: SearchType;
  onSubmit: (data: SearchType) => void;
};

const SearchForm = ({
  className,
  defaultValues,
  onSubmit,
}: SearchFormProps) => {
  const form = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    defaultValues,
  });
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useFetchData("/category", "", "normal");

  const {
    data: brands,
    isLoading: isBrandLoading,
    isError: isBrandError,
  } = useFetchData("/brand", "", "normal");

  const {
    data: colors,
    isLoading: isColorLoading,
    isError: isColorError,
  } = useFetchData("/color", "", "normal");

  const {
    data: sizes,
    isSuccess: isSizeSuccess,
    isLoading: isSizeLoading,
    isError: isSizeError,
  } = useFetchData("/size", "", "normal");

  const [sizeOptions, setSizeOptions] = useState(null);

  // genarate  options
  useEffect(() => {
    if (isSizeSuccess) {
      const sizeOptionsMatching = sizes.map((size) => ({
        value: size.value,
        label: size.value,
      }));
      setSizeOptions(sizeOptionsMatching);
    }
  }, [sizes, isSizeSuccess]);

  // price slider
  const [priceValues, setPriceValues] = useState([
    defaultValues?.minPrice || 0,
    defaultValues?.maxPrice || 1500,
  ]);

  // handle price slider change

  const handleValueChange = (newValues: any) => {
    setPriceValues(newValues);
    form.setValue("minPrice", newValues[0]);
    form.setValue("maxPrice", newValues[1]);
  };

  if (isCategoryLoading || isBrandLoading || isColorLoading || isSizeLoading)
    return <div>Loading...</div>;
  if (isCategoryError || isBrandError || isColorError || isSizeError)
    return <div>Error</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(" px-2 space-y-5", className)}
      >
        <RenderFormField
          control={form.control}
          name="keyword"
          title="Keyword"
          inputType="text"
          type="input"
        />
        <RenderFormSelect
          control={form.control}
          name="category"
          title="Category"
          options={[{ _id: "all", name: "All" }, ...categories]}
          type="key-value"
          displayKey="name"
          valueKey="_id"
        />
        <RenderFormSelect
          control={form.control}
          name="brand"
          title="Brand"
          options={[{ _id: "all", name: "All" }, ...brands]}
          type="key-value"
          displayKey="name"
          valueKey="_id"
        />
        <RenderFormSelect
          control={form.control}
          name="color"
          title="Color"
          options={
            colors &&
            colors.map((color) => ({
              value: color._id,
              label: color.value,
            }))
          }
          type="multi"
        />
        {sizeOptions && (
          <RenderFormSelect
            control={form.control}
            name="size"
            title="Size"
            options={sizeOptions}
            type="multi"
          />
        )}
        <Slider
          defaultValue={priceValues}
          max={1500}
          min={0}
          step={200}
          onValueChange={handleValueChange}
          className={cn("w-full !mt-8")}
        />
        <div className="flex justify-between">
          <p>
            Price: <span className="font-semibold">${priceValues[0]}</span> -{" "}
            <span className="font-semibold">${priceValues[1]}</span>
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button>Filter</Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
