import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemForm from "./ProductItemForm";
import { useEffect, useState } from "react";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type CreateProductItemProps = {
  prodcutId: number;
  productItem: ProductItem;
};
const EditProductItem = ({
  prodcutId,
  productItem,
}: CreateProductItemProps) => {
  const [defaultValues, setDefaultValues] = useState(null);
  const queryClient = useQueryClient();
  function onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `/product/${[prodcutId]}/config`],
    });
    toast.success("Product item updated successfully");
  }
  const { mutate, isPending } = useSubmitData(
    `/product-item/${productItem.id}`,
    onSuccess,
    (e: any) => {
      if (e?.response.data.message) {
        toast.error(e?.response.data.message);
      } else {
        toast.error("Error updating product item");
      }
    }
  );

  useEffect(() => {
    if (productItem) {
      setDefaultValues({
        ...productItem,
        productSizeId: productItem.productSize.id.toString(),
      });
    }
  }, [productItem]);

  const onSubmit = (data: any) => {
    console.log(data);

    return mutate({ data, type: "put" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sky-400 hover:underline cursor-pointer">Edit</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product item</DialogTitle>
        </DialogHeader>
        {defaultValues && (
          <ProductItemForm
            defaultValues={defaultValues}
            loading={isPending}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductItem;
