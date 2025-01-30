import useSubmitData from "@/hooks/useSubmitData";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface HandleRepayProps {
  referenceId: string;
}

const HandleRepay = ({ referenceId }: HandleRepayProps) => {
  function onSucess(data: any) {
    window.location.href = data.url;
  }

  const { mutate: pay, isPending } = useSubmitData(
    "/payment/repay",
    onSucess,
    (err: any) => {
      toast.error(err?.message || "An error occurred");
    }
  );
  const handleRepay = () => {
    return pay({ data: { referenceId }, type: "post" });
  };

  return (
    <Button
      disabled={isPending}
      size="sm"
      className="text-sm text-white bg-blue-600 hover:bg-blue-700 "
      onClick={handleRepay}
    >
      {isPending ? "Processing..." : "Repay"}
    </Button>
  );
};

export default HandleRepay;
