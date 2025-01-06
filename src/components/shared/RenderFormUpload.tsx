import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Dropzone from "./Dropzone";

type RenderFormImageProps<T extends FieldValues> = {
  name: Path<T>;
  title: string;
  control: Control<T>;
  className?: string;
  isMultible: boolean;
  type: "input" | "drop-zone";
  accecptedFiles?: string;
  desciprtion?: string;
};

const RenderFormUpload = ({
  name,
  type,
  title,
  control,
  className,
  accecptedFiles,
  isMultible,
  desciprtion,
}: RenderFormImageProps<FieldValues>) => {
  return (
    <div className={cn("space-y-4", className)}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              {type === "input" ? (
                <Input
                  type="file"
                  onChange={(event) => field.onChange(event.target.files)}
                  multiple={isMultible}
                  accept={accecptedFiles}
                />
              ) : type === "drop-zone" ? (
                <Dropzone
                  isMultiple={isMultible}
                  acceptType={accecptedFiles}
                  onChange={field.onChange}
                />
              ) : (
                <></>
              )}
            </FormControl>
            {desciprtion && <FormDescription>{desciprtion}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RenderFormUpload;
