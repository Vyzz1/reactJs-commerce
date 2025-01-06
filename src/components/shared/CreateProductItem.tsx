import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ProductItemForm from "./ProductItemForm";
import { ProductItemType } from "@/zod";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type CreateProductItemProps = {
  productId: number;
};

const CreateProductItem = ({ productId }: CreateProductItemProps) => {
  const queryClient = useQueryClient();
  function onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `/product/${productId}/config`],
    });
    toast.success("Product item created successfully");
  }

  const { mutate, isPending } = useSubmitData(
    `/product-item/${productId}`,
    onSuccess,
    (e: any) => {
      toast.error(e?.response.data.message);
    }
  );
  const onSubmit = (data: ProductItemType) => {
    return mutate({ data, type: "post" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new product item</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new product item
          </DialogDescription>
        </DialogHeader>
        <ProductItemForm loading={isPending} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductItem;
