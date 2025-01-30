import { Checkbox } from "../ui/checkbox";
import useSubmitData from "@/hooks/useSubmitData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type ShowHomepageCheckProps = {
  _id: string;
  showHomepage: boolean;
};

const ShowHomepageCheck = ({ _id, showHomepage }: ShowHomepageCheckProps) => {
  const queryClient = useQueryClient();
  const success = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "/product"],
    });
    toast.success(`Product updated successfully`);
  };
  const { mutate, isPending } = useSubmitData(
    `product/show/${_id}`,
    success,
    () => {
      toast.error("Failed to update product");
    }
  );
  const handleCheck = (e: boolean) => {
    return mutate({
      data: {
        showHomepage: e,
      },
      type: "put",
    });
  };
  return (
    <Checkbox
      disabled={isPending}
      checked={showHomepage}
      onCheckedChange={(e) => handleCheck(e as boolean)}
    />
  );
};

export default ShowHomepageCheck;
