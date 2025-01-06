import { baseURL } from "@/api/axios";
import RenderFormUpload from "@/components/shared/RenderFormUpload";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSetTitle from "@/hooks/useSetTitle";
import useSubmitData from "@/hooks/useSubmitData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateLogo = () => {
  useSetTitle("Update Logo");

  const { currentUser, updateCurrentUser } = useAuth();
  const formSchema = z
    .object({
      avatar: z
        .instanceof(FileList, {
          message: "Please select a file",
        })
        .refine((files) => files.length > 0, "Please select a file"),
    })
    .refine((data) => data.avatar[0].type.includes("image"), {
      message: "Please select an image file",
      path: ["avatar"],
    });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSuccess = () => {
    setLoading(false);
    form.reset();
    toast.success("File uploaded successfully");
  };

  const { mutate } = useSubmitData("/auth/update-logo", onSuccess, () => {
    console.log("error");
    setLoading(false);
  });

  const axios = useAxiosPrivate({ type: "upload" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (data.avatar && data.avatar.length > 0) {
      setLoading(true);
      const file = data.avatar[0];

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/file", formData);

      if (res.data) {
        updateCurrentUser({
          ...currentUser,
          photoUrl: `${res.data.publicUrl}`,
        });

        return mutate({
          data: {
            photoUrl: `${res.data.publicUrl}`,
          },
          type: "put",
        });
      }
    } else {
      throw new Error("Please select a file");
    }
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl text-center font-inter font-semibold uppercase text-sky-700 tracking-wide">
        Update Logo
      </h2>
      <p className="text-slate-700 text-2xl py-5">Current Logo</p>
      <img
        src={currentUser?.photoUrl || "/user.png"}
        alt="logo"
        className="w-72 aspect-square object-cover h-72"
      />
      <Form {...form}>
        <form
          className="mt-8 space-y-8 max-w-4xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <RenderFormUpload
            type="input"
            isMultible={false}
            control={form.control}
            name="avatar"
            accecptedFiles="image/*"
            title="Logo"
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UpdateLogo;
