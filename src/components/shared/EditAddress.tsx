import useFetchData from "@/hooks/useFetchData";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AddressForm from "./AddressForm";
import { AddressType } from "@/zod";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type EditAddressProps = {
  id: number;
};

const EditAddress = ({ id }: EditAddressProps) => {
  const { data, isLoading, isError } = useFetchData(
    `/address/${id}`,
    "",
    "private"
  );
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success("Address updated successfully");
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "address/auth"],
    });
  };
  const { mutate, isPending } = useSubmitData(
    `/address/${id}`,
    onSuccess,
    () => {
      toast.error("Failed to add address");
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  const onSubmit = (formData: AddressType) => {
    return mutate({ data: formData, type: "put" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sky-400 cursor-pointer">Edit</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit your address</DialogTitle>
        </DialogHeader>
        <AddressForm
          isPending={isPending}
          defaultValues={data}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
