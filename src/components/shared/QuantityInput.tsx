import { useEffect } from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "../ui/input";

type QuantityInputProps = {
  max?: number;
  quantity: number;
  loading?: boolean;
  setQuantity: (value: number) => void;
  onValueChange?: (value: number) => void;
};

const QuantityInput = ({
  max,
  quantity,
  setQuantity,
  onValueChange,
  loading,
}: QuantityInputProps) => {
  const handleMinus = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onValueChange) {
        onValueChange(newQuantity);
      }
    }
  };

  const handlePlus = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onValueChange) {
        onValueChange(newQuantity);
      }
    }
  };

  useEffect(() => {
    if (quantity >= max) {
      setQuantity(max);
    }
  }, [quantity, max, setQuantity]);

  return (
    <>
      <Button
        variant="outline"
        onClick={handleMinus}
        disabled={loading}
        size="icon"
        className="size-6  dark:border-slate-200"
      >
        <MinusIcon className="size-3" />
      </Button>
      <Input
        value={quantity}
        className="max-w-[55px] p-0 m-0  ring-0 dark:border-slate-200   pointer-events-none text-center size-6 rounded-sm text-sm"
      />
      <Button
        variant="outline"
        disabled={quantity >= max || loading}
        size="icon"
        className="size-6 dark:border-slate-200"
        onClick={handlePlus}
      >
        <PlusIcon className="size-3" />
      </Button>
    </>
  );
};

export default QuantityInput;
