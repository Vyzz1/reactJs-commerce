import OrderTracking from "@/components/shared/OrderTracking";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { format } from "date-fns";
import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  useSetTitle("Order Details");

  const { id } = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useFetchData(`order/${id}`, "", "private");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred</div>;
  }
  return (
    <section className="py-7">
      <div className="max-w-6xl w-full mx-auto px-4">
        <h2 className="text-transparent mb-8 text-3xl text-center uppercase bg-clip-text bg-gradient-to-b py-2 from-slate-400 to-indigo-600">
          Order {id}
        </h2>
        <OrderTracking status={order.status} />
        <div className="mt-7 space-y-7">
          <p className="text-muted-foreground">
            {" "}
            {format(new Date(order.createdAt), "HH:mm dd/MM/yyyy")}
          </p>
          <div className="text-muted-foreground dark:text-white space-y-5 mt-3">
            <h2 className="text-slate-950 dark:text-white">
              Recieve Address :
            </h2>
            <blockquote className="pl-3 border-l  dark:border-white">
              {order.address.specify} - {order.address.phoneNumber}
            </blockquote>
            <p className="text-sm">
              {order.address.province.split("-")[1]},{" "}
              {order.address.district.split("-")[1]}, {order.address.ward}{" "}
            </p>
          </div>
          <div className="border px-3 py-2 rounded-sm">
            {order.orderDetails.map((detail: OrderDetails) => (
              <div key={detail.id} className="flex items-center space-x-4 py-2">
                <img
                  src={detail.productItem.avatar}
                  alt={detail.productItem.productName}
                  className="size-24 object-cover aspect-square rounded-md"
                />
                <div className="space-y-2">
                  <p className="text-slate-900 dark:text-white text-lg">
                    {detail.productItem.productName}
                  </p>
                  <p className="text-sm font-semibold">
                    {" "}
                    {detail.quantity} x{" "}
                    <span className="text-red-400 text-lg">
                      ${detail.productItem.productPrice}
                    </span>
                  </p>

                  <p className="text-black dark:text-white ">
                    {detail.productItem.productSize.value} -{" "}
                    {detail.productItem.color}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
