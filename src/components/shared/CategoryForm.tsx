import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import RenderFormField from "./RenderFormField";
import RenderFormUpload from "./RenderFormUpload";
import { Button } from "../ui/button";
import { CategoryFormType, categorySchema } from "@/zod";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { baseURL } from "@/api/axios";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type CategoryFormProps = {
  defaultValues?: CategoryFormType;
  className?: string;
  type: "create" | "update";
} & (
  | { type: "create"; id?: never; defaultValues?: CategoryFormType }
  | { type: "update"; id: number; defaultValues: CategoryFormType }
);

const CategoryForm = ({
  defaultValues,
  className,
  type,
  id,
}: CategoryFormProps) => {
  const form = useForm<z.infer<typeof categorySchema>>({
    defaultValues: defaultValues,
    resolver: zodResolver(categorySchema),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "/category/all"],
    });
    toast.success(`Category ${type === "create" ? "created" : "updated"}!`);
  };
  const axios = useAxiosPrivate({ type: "upload" });

  const endpoint = type === "create" ? "/category" : `/category/${id}`;

  const { mutate, isPending } = useSubmitData(endpoint, success, (err: any) => {
    if (err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Error creating category");
    }
  });

  const onSubmit = async (data: CategoryFormType) => {
    console.log(data);

    try {
      setLoading(true);
      const body = { ...data };
      if (data.image instanceof FileList) {
        if (data.image.length > 0) {
          const file = data.image[0];
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.post("/file", formData);
          if (res) {
            body.image = `${res.data.publicUrl}`;
          }
        }
      }
      return mutate({ data: body, type: type === "create" ? "post" : "put" });
    } catch {
      toast.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
      >
        <RenderFormField
          name="name"
          control={form.control}
          title="Category Name"
          type="input"
          placeholder="Enter category name"
        />
        <RenderFormUpload
          name="image"
          control={form.control}
          title="Category Image"
          type="input"
          isMultible={false}
        />
        {type === "update" && defaultValues?.image && (
          <img
            src={defaultValues.image as string}
            alt={defaultValues.name}
            className="size-24 object-cover rounded-md"
          />
        )}
        <Button type="submit" disabled={loading || isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
