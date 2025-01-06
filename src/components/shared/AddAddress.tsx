import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AddressForm from "./AddressForm";
import { AddressType } from "@/zod";

const AddAddress = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success("Address added successfully");
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "address/auth"],
    });
  };

  const { mutate, isPending } = useSubmitData("/address", onSuccess, () => {
    toast.error("Failed to add address");
  });

  const onSubmit = (formData: AddressType) => {
    return mutate({ data: formData, type: "post" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add New Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add a new address</DialogTitle>
        </DialogHeader>
        <AddressForm isPending={isPending} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
