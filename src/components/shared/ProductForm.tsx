import { ProductFormType, productSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import RenderFormField from "./RenderFormField";
import { cn } from "@/lib/utils";
import useFetchData from "@/hooks/useFetchData";
import RenderFormSelect from "./RenderFormSelect";
import { Button } from "../ui/button";
import RenderFormUpload from "./RenderFormUpload";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  defaultValues?: ProductFormType;
  className?: string;
  type: "create" | "update";
  id?: number;
  images?: string[];
  setImages?: (images: string[]) => void;
};

const ProductForm = ({
  type,
  id,
  defaultValues,
  images,
  className,
  setImages,
}: ProductFormProps) => {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(productSchema(type)),
    defaultValues,
  });

  const {
    data: categories,
    isLoading: fetchingCategory,
    isError: categoryError,
  } = useFetchData("/category/all", "", "normal");

  const {
    data: brands,
    isLoading: fetchingBrand,
    isError: brandError,
  } = useFetchData("/brand/all", "", "normal");

  const {
    data: colors,
    isLoading: fetchingColor,
    isError: colorError,
  } = useFetchData("/color/all", "", "normal");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const onSuccess = (data: Product) => {
    queryClient.invalidateQueries({
      queryKey: [
        "fetchData",
        type === "create" ? "/product/all" : `/product/${id}`,
      ],
    });

    queryClient.setQueryData(["fetchData", `/product/${data.id}`], data);

    navigate(
      type === "create"
        ? `/admin/product/${data.id}/config`
        : `/product/${data.id}`
    );

    toast.success(`Product ${type === "create" ? "created" : "updated"}!`);
  };
  const endpoint = type === "create" ? "/product" : `/product/${id}`;

  const { mutate, isPending } = useSubmitData(endpoint, onSuccess, () => {
    toast.error("Error creating product");
    form.reset();
  });
  const axios = useAxiosPrivate({ type: "upload" });
  const [loading, setLoading] = useState(false);

  let uploadedImages: string[] = [];

  const handleSubmit = async (formData: ProductFormType) => {
    const body = { ...formData };
    try {
      setLoading(true);

      // Upload image
      if (formData.avatar.length > 0) {
        if (formData.avatar instanceof FileList) {
          const file = formData.avatar[0];
          const res = await axios.post("/file", {
            file,
          });
          if (res) {
            body.avatar = `${res.data.publicUrl}`;
          }
        }
      }

      // upload multiple images

      // upload multiple images
      if (formData.images.length > 0) {
        if (formData.images instanceof FileList) {
          const files = new FormData();
          Array.from(formData.images).forEach((file) => {
            files.append("files", file);
          });

          const res = await axios.post("/file/multiple", files, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res) {
            uploadedImages = res.data.map((file: any) => `${file.publicUrl}`);
          }
        }
      }
      const combinedImages = [...(images || []), ...uploadedImages];
      body.images = combinedImages;
      if (setImages) {
        setImages(combinedImages);
      }

      return mutate({ data: body, type: type === "create" ? "post" : "put" });
    } catch (error) {
      console.error("Error creating product", error);
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  if (brandError || categoryError || colorError) {
    return <div>Error</div>;
  }
  if (fetchingCategory || fetchingBrand || fetchingColor) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(className)}
      >
        <div className="grid grid-cols-2 gap-2">
          <RenderFormField
            name="name"
            title="Product Name"
            type="input"
            control={form.control}
          />
          <RenderFormField
            name="price"
            title="Price"
            type="input"
            control={form.control}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <RenderFormUpload
            name="avatar"
            control={form.control}
            title="Display Avatar"
            type="input"
            isMultible={false}
          />
          <RenderFormUpload
            name="images"
            control={form.control}
            title="Product Images"
            type="input"
            isMultible
          />
        </div>
        <RenderFormSelect
          name="productColorId"
          title="Color"
          control={form.control}
          options={colors}
          valueKey="id"
          displayKey="value"
        />

        <div className="flex items-center gap-x-2">
          <RenderFormSelect
            name="categoryId"
            title="Category"
            control={form.control}
            options={categories}
            valueKey="id"
            className="w-1/2"
            displayKey="name"
          />
          <RenderFormSelect
            control={form.control}
            options={brands}
            valueKey="id"
            displayKey="name"
            name="brandId"
            title="Brand"
            className="w-1/2"
          />
        </div>
        <RenderFormField
          name="description"
          control={form.control}
          title="Description"
          type="text-editor"
        />

        <Button disabled={loading || isPending} type="submit">
          {loading || isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
