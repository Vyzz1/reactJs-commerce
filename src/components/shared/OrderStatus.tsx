import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type OrderStatusProps = {
  status: OrderStatus;
  id: number;
};

const OrderStatus = ({ status, id }: OrderStatusProps) => {
  const orderStatus = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success("Order status updated successfully");
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `/order/all`, `/order/${id}`],
    });
  };

  const { mutate, isPending } = useSubmitData(`/order/${id}`, onSuccess, () => {
    toast.error("An error occurred");
  });
  const handleChange = (value: OrderStatus) => {
    return mutate({
      data: {
        status: value,
      },
      type: "put",
    });
  };
  return (
    <Select
      disabled={isPending}
      defaultValue={status}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {orderStatus.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderStatus;
