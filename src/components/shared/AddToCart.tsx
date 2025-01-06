import React from "react";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import useSubmitData from "@/hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";

type AddToCartProps = {
  quantity: number;
  productItemId: number;
};

const AddToCart = ({ quantity, productItemId }: AddToCartProps) => {
  const { auth } = useAuth();

  const queryClient = useQueryClient();
  function onSuccess(data) {
    console.log(data);
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "/cart/auth"],
    });

    toast.success("Add to cart successfully");
  }
  const { mutate, isPending } = useSubmitData("/cart", onSuccess, () => {
    toast.error("Error when adding");
  });

  function handleAdd() {
    if (!auth) {
      toast.info("Please login ");
      return;
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      toast.error("Invalid quantity");
      return;
    }
    const body = {
      quantity,
      productItemId,
    };

    return mutate({ data: body, type: "post" });
  }
  return (
    <Button
      disabled={isPending || quantity < 1}
      onClick={handleAdd}
      className="blue-button"
      size="lg"
    >
      <ShoppingCartIcon className="mr-2 size-4" />
      Add to cart
    </Button>
  );
};

export default AddToCart;
