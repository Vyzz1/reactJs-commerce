import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Test = () => {
  const formSchema = z.object({
    name: z.string().min(3),
    isLogin: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "React",
    },
  });

  return (
    <section className="py-8">
      <div className="max-w-6xl w-full mx-auto px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      type="single"
                    >
                      <ToggleGroupItem value="React">REact</ToggleGroupItem>
                      <ToggleGroupItem value="Java">java</ToggleGroupItem>
                      <ToggleGroupItem value="angular">Angular</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isLogin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => {
                form.reset({});
              }}
            >
              Reset
            </Button>
            <Button>Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Test;
