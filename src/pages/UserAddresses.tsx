import AddAddress from "@/components/shared/AddAddress";
import DeleteService from "@/components/shared/DeleteService";
import EditAddress from "@/components/shared/EditAddress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import useSubmitData from "@/hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const UserAddresses = () => {
  useSetTitle("Your Addresses");

  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "address/auth"],
    });
    toast.success("Address updated successfully");
  };
  const { mutate, isPending } = useSubmitData(
    "/address/set-default",
    onSuccess,
    () => {
      toast.error("Failed to set default address");
    }
  );
  const handleSetDefault = (id: number) => {
    console.log("Set as default");
    return mutate({ data: { id }, type: "put" });
  };
  const {
    isError,
    isLoading,
    data: addresses,
  } = useFetchData("address/auth", "", "private");
  if (isError) return <p>Something went wrong</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="py-8">
      <h2 className=" uppercase text-3xl font-semibold text-blue-500 text-center">
        Your Addresses
      </h2>

      <div className="max-w-5xl space-y-5 mt-12 mx-auto w-full divide-y">
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-600 dark:text-white">Your Address</p>
          <AddAddress />
        </div>

        {addresses.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            You haven't added any address yet
          </p>
        )}

        {addresses
          .sort(
            (a: UserAddress, b: UserAddress) =>
              Number(b.isDefault) - Number(a.isDefault)
          )
          .map((address: UserAddress) => (
            <div
              className="flex justify-between py-3 flex-wrap space-y-3 items-center"
              key={address.id}
            >
              <div className="space-y-4">
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <p className="font-normal tracking-wide text-base text-black dark:text-white">
                    {address.fullName}
                  </p>
                  <Separator orientation="vertical" className="dark:bg-white" />
                  <p className="text-muted-foreground">{address.phoneNumber}</p>
                </div>
                <div className="text-muted-foreground space-y-5">
                  <blockquote className="pl-3 border-l dark:border-white">
                    {address.specify}
                  </blockquote>
                  <p className="text-sm">
                    {address.province.split("-")[1]},{" "}
                    {address.district.split("-")[1]}, {address.ward}{" "}
                    {address.isDefault && <Badge>Default</Badge>}
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col justify-center items-start lg:items-end">
                <div className="flex items-center gap-x-3 flex-wrap">
                  <EditAddress id={address.id} />
                  {!address.isDefault && (
                    <DeleteService
                      endpoint={`address/${address.id}`}
                      queryKey="address/auth"
                    >
                      <Trash className="text-red-500 size-5" />
                    </DeleteService>
                  )}
                </div>
                {!address.isDefault && (
                  <Button
                    disabled={isPending}
                    onClick={() => handleSetDefault(address.id)}
                    size="sm"
                    className="m-0 text-sm"
                    variant="outline"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserAddresses;
