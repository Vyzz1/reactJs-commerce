import React, { useState } from "react";
import QuantityInput from "./QuantityInput";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type ToggleQuantityProps = {
  cartId: number;
  max: number;
  quantity: number;
  onQuantityChange: (v: number) => void;
};

const ToggleQuantity = ({
  max,
  cartId,
  quantity,
  onQuantityChange,
}: ToggleQuantityProps) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  // console.log(cartId)
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "/cart/auth"],
    });
  };
  const { mutate, isPending } = useSubmitData(
    `cart/quantity/${cartId}`,
    onSuccess,
    () => {
      toast.error("Error");
    }
  );
  const onChange = (v: number) => {
    const body = {
      productItemId: cartId,
      quantity: v,
    };
    onQuantityChange(v);
    return mutate({ data: body, type: "put" });
  };

  return (
    <QuantityInput
      max={max}
      loading={isPending}
      onValueChange={onChange}
      quantity={currentQuantity}
      setQuantity={setCurrentQuantity}
    />
  );
};

export default ToggleQuantity;
