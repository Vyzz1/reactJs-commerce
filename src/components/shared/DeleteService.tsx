import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const DeleteService = ({
  endpoint,
  queryKey,
  onDeleted,
  children,
}: {
  endpoint: string;
  queryKey: string;
  onDeleted?: () => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  function onSuccess() {
    setOpen(false);
    setLoading(false);
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `${queryKey}`],
    });
    toast.success("Deleted successfully");
    if (onDeleted) {
      onDeleted();
    }
  }

  const { isError, mutate } = useSubmitData(`${endpoint}`, onSuccess);

  if (isError) {
    console.log("Error deleting");
    toast.error("Error deleteting  ");
  }

  function handleDelete() {
    setLoading(true);
    return mutate({ data: {}, type: "delete" });
  }
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="text-red-500 text-[16px] hover:underline">
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-600 ">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={loading}
              onClick={handleDelete}
              className="bg-transparent text-red-500 border border-slate-500 hover:bg-transparent hover:border-red-500"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteService;
