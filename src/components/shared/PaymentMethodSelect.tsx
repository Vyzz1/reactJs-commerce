import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface PaymentMethodSelectProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  onSelect,
}) => {
  return (
    <Select onValueChange={(value) => onSelect(value)} defaultValue="cash">
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select Payment Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cash </SelectLabel>
          <SelectItem value="cash">Cash on Delivery</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Online Payment</SelectLabel>
          <SelectItem value="stripe">Stripe</SelectItem>
          <SelectItem disabled value="paypal">
            Paypal
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PaymentMethodSelect;
