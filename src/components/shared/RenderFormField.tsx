import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";

import { Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import TinyMce from "./TinyMce";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type RenderFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  title: string;
  control: Control<T>;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  isMultipleFile?: boolean;
  disabled?: boolean;
  inputType?: "text" | "password" | "email" | "number" | "file";
  type: "input" | "textarea" | "text-editor" | "date-picker";
};

const RenderFormField = <T extends FieldValues>({
  name,
  title,
  control,
  className,
  inputClassName,
  placeholder,
  labelClassName,
  disabled,
  inputType,

  type,
}: RenderFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel className={cn(labelClassName)}> {title} </FormLabel>
          <FormControl>
            {(() => {
              switch (type) {
                case "input":
                  return (
                    <Input
                      disabled={disabled}
                      {...field}
                      className={cn(inputClassName)}
                      type={inputType ?? "text"}
                      min={inputType === "number" ? 0 : undefined}
                      placeholder={placeholder ?? ""}
                    />
                  );
                case "textarea":
                  return (
                    <Textarea
                      disabled={disabled}
                      className={cn(inputClassName)}
                      placeholder={placeholder ?? ""}
                      {...field}
                    />
                  );
                case "text-editor":
                  return (
                    <TinyMce title="" name={name} initialValue={field.value} />
                  );
                case "date-picker":
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          fromYear={1899}
                          toYear={new Date().getFullYear()}
                          captionLayout="dropdown-buttons"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );

                default:
                  return null;
              }
            })()}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RenderFormField;
