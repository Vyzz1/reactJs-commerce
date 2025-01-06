import RenderFormField from "@/components/shared/RenderFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSetTitle from "@/hooks/useSetTitle";
import useSubmitData from "@/hooks/useSubmitData";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const ChangePasword = () => {
  useSetTitle("Change Your Password");

  const formSchema = z
    .object({
      currentPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      message: "New password should be different from current password",
      path: ["newPassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSuccess = () => {
    toast.success("Password changed successfully");
  };

  const { mutate } = useSubmitData(
    "/auth/change-password",
    onSuccess,
    (error) => {
      toast.error(error["response"].data?.message);
    }
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      mutate({ data, type: "post" });
    } catch (err) {
      console.error(err);

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <section className="py-8">
      <h2 className="font-bold  text-gray-950 tracking-wide text-2xl">
        Change Pasword
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[520px] mt-10"
        >
          <RenderFormField
            control={form.control}
            name="currentPassword"
            title="Current Password"
            type="input"
            inputType="password"
            inputClassName="focus-visible:ring-sky-500"
          />
          <RenderFormField
            control={form.control}
            name="newPassword"
            title="New Password"
            type="input"
            inputType="password"
            inputClassName="focus-visible:ring-sky-500"
          />
          <RenderFormField
            control={form.control}
            name="confirmPassword"
            inputType="password"
            title="Confirm Password"
            type="input"
            inputClassName="focus-visible:ring-sky-500"
          />
          <Button type="submit"> Change Password </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasword;
