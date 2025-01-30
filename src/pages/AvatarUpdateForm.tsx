import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { UploadCloudIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import useSubmitData from "@/hooks/useSubmitData";

export function AvatarUpdateForm() {
  const { currentUser, updateCurrentUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUser?.photoUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const axios = useAxiosPrivate({ type: "upload" });

  function onsucces(data) {
    toast.success("Avatar updated successfully");
    setFile(null);
    setPreview(null);
    updateCurrentUser({
      ...currentUser,

      photoUrl: data.photoURL,
    });
  }

  const { mutate, isPending } = useSubmitData(`/auth/avatar`, onsucces, () => {
    toast.error("An error occurred");
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios.post(`file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.data) {
        mutate({ data: { photoUrl: result.data.publicUrl }, type: "put" });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Update Your Avatar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="size-32 border-4 ">
              <AvatarImage
                src={preview || "/placeholder.svg?height=128&width=128"}
                alt="Avatar preview"
              />
              <AvatarFallback>KV</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Label
                htmlFor="avatar"
                className="block text-sm font-medium text-center mb-2"
              >
                Choose a new avatar
              </Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="avatar"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloudIcon className="size-6 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or GIF
                    </p>
                  </div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!file || isSubmitting || isPending}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Avatar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
