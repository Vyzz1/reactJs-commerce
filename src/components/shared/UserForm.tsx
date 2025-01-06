import React from "react";
import RenderFormField from "./RenderFormField";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { UserFormType, userSchema } from "@/zod";
import RenderFormSelect from "./RenderFormSelect";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserFormProps = {
  defaultValues: Partial<UserFormType>;
  isRegister: boolean;
  onSubmit: (formValue: UserFormType) => void;
  isPending: boolean;
};

const UserForm = ({
  defaultValues,
  isRegister,
  onSubmit,
  isPending,
}: UserFormProps) => {
  const schema = !isRegister
    ? userSchema
    : userSchema
        .extend({
          password: z.string().min(5).max(100),
          confirmPassword: z.string().min(5).max(100),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });

  type FormType = z.infer<typeof schema>;
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <RenderFormField
              name="firstName"
              title="First Name"
              type="input"
              inputType="text"
              placeholder="John"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <RenderFormField
              name="lastName"
              title="Last Name"
              type="input"
              inputType="text"
              placeholder="Snow"
              control={form.control}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <RenderFormField
            name="email"
            title="Email"
            type="input"
            inputType="email"
            disabled={!isRegister}
            placeholder="vy@gmail.com"
            control={form.control}
          />
        </div>
        {isRegister && (
          <>
            <div className="grid gap-2">
              <RenderFormField
                name="password"
                title="Password"
                type="input"
                inputType="password"
                control={form.control}
              />
            </div>
            <div>
              <RenderFormField
                name="confirmPassword"
                title="Confirm Password"
                type="input"
                inputType="password"
                control={form.control}
              />
            </div>
          </>
        )}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="grid gap-2">
            <RenderFormField
              name="dob"
              title="Date of Birth"
              type="date-picker"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <RenderFormSelect
              name="gender"
              title="Gender"
              type="value"
              options={["Male", "Female", "Other"]}
              control={form.control}
            />
          </div>
        </div>

        <div className=" flex items-center gap-2 ">
          <Button className="w-1/2" type="reset" variant="outline">
            Reset
          </Button>
          <Button disabled={isPending} type="submit" className="w-1/2">
            {isRegister ? "Sign Up" : "Modify"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
