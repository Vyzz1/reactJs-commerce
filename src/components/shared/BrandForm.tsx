import useSubmitData from "@/hooks/useSubmitData";
import { BrandFormType, brandSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import RenderFormField from "./RenderFormField";
import { Button } from "../ui/button";
type BrandForm = {
  className?: string;
  type: "create" | "update";
} & (
  | { type: "create"; id?: never; defaultValues?: BrandFormType }
  | { type: "update"; id: number; defaultValues: BrandFormType }
);
const BrandForm = ({ defaultValues, className, type, id }: BrandForm) => {
  const form = useForm<BrandFormType>({
    resolver: zodResolver(brandSchema),
    defaultValues: defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "/brand/all"],
    });
    toast.success(`Brand ${type === "create" ? "created" : "updated"}!`);
  };

  const endpoint = type === "create" ? "/brand" : `/brand/${id}`;

  const { mutate, isPending } = useSubmitData(endpoint, success, (err: any) => {
    if (err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Error creating category");
    }
  });

  const onSubmit = async (data: BrandFormType) => {
    try {
      setLoading(true);
      return mutate({ data, type: type === "create" ? "post" : "put" });
    } catch {
      toast.error("Error creating brand");
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
          control={form.control}
          name="name"
          title="Name"
          type="input"
        />
        <Button disabled={loading || isPending}>
          {type === "create" ? "Create" : "Update"} Brand
        </Button>
      </form>
    </Form>
  );
};

export default BrandForm;
