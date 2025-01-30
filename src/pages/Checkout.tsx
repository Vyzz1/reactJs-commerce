import AddAddress from "@/components/shared/AddAddress";
import ChangeAddress from "@/components/shared/ChangeAddress";
import PaymentMethodSelect from "@/components/shared/PaymentMethodSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { CheckoutContext } from "@/context/CheckoutContext";
import { SHPPING_FEE } from "@/data";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import useSubmitData from "@/hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";
import { TruckIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  useSetTitle("Checkout");

  const { isLoading, isSuccess, isError, data } = useFetchData(
    "/address",
    "",
    "private"
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { products, total } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // handle for orders
  function onSucess(data: any) {
    toast.success("Order placed successfully");
    queryClient.setQueryData(["fetchData", `/order/${data._id}`], data);

    navigate(`/order/${data._id}`);
  }

  //handle for stripe payment

  const onPaymentSuccess = (data: any) => {
    window.location.href = data.url;
  };

  const { mutate, isPending } = useSubmitData("/order", onSucess, () => {
    toast.error("An error occurred");
  });

  //handle for payment stripe

  const { mutate: pay, isPending: isPaying } = useSubmitData(
    "/payment",
    onPaymentSuccess,
    () => {
      toast.error("An error occurred");
    }
  );
  useEffect(() => {
    if (isSuccess && data.length) {
      const defaultAddress = data.find((address) => address.isDefault);
      if (defaultAddress) setSelectedAddress(defaultAddress._id);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>An error occurred</p>;
  }
  if (data.length === 0) {
    return (
      <div className="container space-y-8  h-screen">
        <h2 className="text-4xl mt-10 text-center text-indigo-400">
          Please add an address to continue
        </h2>
        <div className="flex justify-center ">
          <AddAddress />
        </div>
      </div>
    );
  }
  const renderAddressDetails = (selectedAddressId: string) => {
    const address = data.find(
      (addr: UserAddress) => addr._id === selectedAddressId
    );

    if (!address) return null;

    const { fullName, phoneNumber, specify, province, district, ward } =
      address;

    return (
      <div className="flex justify-between py-3 items-center">
        <div className="space-y-4">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <p className="font-normal tracking-wide text-base text-black dark:text-white">
              {fullName}
            </p>
            <Separator orientation="vertical" className="dark:bg-gray-50" />
            <p className="text-muted-foreground">{phoneNumber}</p>
          </div>
          <div className="text-muted-foreground space-y-5">
            <blockquote className="pl-3 border-l dark:border-gray-50">
              {specify}
            </blockquote>
            <p className="text-sm">
              {province.split("-")[1]}, {district.split("-")[1]}, {ward}{" "}
              {address.isDefault && <Badge>Default</Badge>}
            </p>
          </div>
        </div>
      </div>
    );
  };
  const handlePlaceOrder = async () => {
    const referenceId = Math.floor(Math.random() * 1000000) + "" + Date.now();

    const data = {
      total: total + SHPPING_FEE,
      shippingFee: SHPPING_FEE,
      address: selectedAddress,
      orderDetails: products.map((product) => ({
        productItemId: product.productItem,
        quantity: product.quantity,
      })),
      method: paymentMethod,
      ...(paymentMethod !== "cash" && { statusPay: "pending", referenceId }),
    };

    //create order

    if (paymentMethod === "stripe") {
      mutate({ data, type: "post" });

      const paymentData = {
        request: products.map((product) => ({
          productItem: product.productItem,
          quantity: product.quantity,
        })),
        total: total + SHPPING_FEE,
        referenceId,
      };

      return pay({ data: paymentData, type: "post" });
    } else {
      return mutate({ data, type: "post" });
    }
  };

  return (
    selectedAddress && (
      <section className="container py-8">
        <h2 className="text-transparent mb-8 text-3xl text-center uppercase bg-clip-text bg-gradient-to-b py-2 from-slate-400 to-indigo-600">
          Checkout
        </h2>
        <div className="max-w-6xl space-y-8 w-full mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-slate-700 dark:text-white">
                Delivery Address
              </p>
              <ChangeAddress addresses={data} setAddress={setSelectedAddress} />
            </div>
            <Separator />
            {renderAddressDetails(selectedAddress)}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-slate-700 dark:text-white">
                Your Order Summary
              </p>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-3  items-center w-full">
              {products.map((product: any) => (
                <div
                  key={product._id}
                  className="flex-col flex  w-fit border items-center overflow-hidden 
                    py-2 px-2
                  gap-y-2 justify-center"
                >
                  <img
                    src={product.productItem.product.avatar}
                    alt={product.productItem.product.name}
                    className=" aspect-square w-40 object-cover rounded-sm"
                  />
                  <p className="text-slate-700 dark:text-white max-w-[150px]  truncate ">
                    {product.productItem.product.name}
                  </p>
                  <p className="text-red-500">
                    {product.quantity} x {product.productItem.product.price}$
                  </p>
                  <div className="text-muted-foreground text-sm">
                    {product.productItem.productSize.value} -{" "}
                    {product.productItem.product.productColor.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex  bottom-5 border shadow-sm px-3 py-2 border-slate-100 z-10 bg-white/5 dark:bg-transparent justify-end items-center">
            <div className="flex-col space-y-3 max-w-lg w-full ">
              <div className="flex w-full items-center justify-between">
                <p className="text-base">Payment Method</p>
                <PaymentMethodSelect onSelect={setPaymentMethod} />
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-lg">Shpping Fee</p>
                <p className="text-red-500">${SHPPING_FEE}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-lg">Total</p>
                <p className="text-red-500">${SHPPING_FEE + total}</p>
              </div>
              <div className="flex w-full items-center justify-end">
                <Button
                  disabled={isPending || isPaying}
                  onClick={handlePlaceOrder}
                  size="sm"
                >
                  <TruckIcon className="size-4 mr-2" />
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Checkout;
