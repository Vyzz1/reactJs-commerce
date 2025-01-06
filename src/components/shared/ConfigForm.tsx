import { ConfigFormType, configSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import RenderFormField from "./RenderFormField";
import { Button } from "../ui/button";
import useSubmitData from "@/hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type ConfigForm = {
  defaultValues?: ConfigFormType;
  className?: string;
  type: "create" | "update";
  configType: "size" | "color";
} & (
  | { type: "create"; id?: never; defaultValues?: ConfigFormType }
  | { type: "update"; id: number; defaultValues: ConfigFormType }
);
const ConfigForm = ({
  defaultValues,
  type,
  configType,
  id,
  className,
}: ConfigForm) => {
  const form = useForm<ConfigFormType>({
    resolver: zodResolver(configSchema),
    defaultValues: defaultValues,
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const success = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `/${configType}/all`],
    });
    toast.success(`Category ${type === "create" ? "created" : "updated"}!`);
  };

  const endpoint =
    type === "create" ? `/${configType}` : `/${configType}/${id}`;
  const { mutate, isPending } = useSubmitData(endpoint, success, (err: any) => {
    if (err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Error creating category");
    }
  });
  const onSubmit = (data: ConfigFormType) => {
    try {
      setLoading(true);
      return mutate({ data, type: type === "create" ? "post" : "put" });
    } catch {
      toast.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className={cn("space-y-5", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {type === "update" && (
          <RenderFormField
            control={form.control}
            name="id"
            title="ID"
            type="input"
            disabled
          />
        )}
        <RenderFormField
          control={form.control}
          name="value"
          title="Value"
          type="input"
        />
        <Button type="submit" disabled={loading || isPending}>
          {type === "create" ? "Create" : "Update"} Config
        </Button>
      </form>
    </Form>
  );
};

export default ConfigForm;
