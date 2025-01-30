import HandleRepay from "@/components/shared/HandleRepay";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const UserOrders = () => {
  useSetTitle("Your orders");

  const { data, isLoading, isError } = useFetchData("order", "", "private");

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>An error occurred</div>;
  }
  const renderOrdersByStatus = (status: OrderStatus) => {
    return data
      .filter((order: OrderType) => order.status === status)
      .map((order: OrderType) => (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <Link
                to={`/order/${order._id}`}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Order ID: {order._id}
              </Link>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {order.method}
                </span>
                {order.method !== "cash" && (
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      order.statusPay === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.statusPay.toUpperCase()}
                  </span>
                )}
                {order.method !== "cash" && order.statusPay === "pending" && (
                  <HandleRepay referenceId={order.referenceId} />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-base">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.status}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  ${order.total}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Shipping Fee</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  ${order.shippingFee}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(order.createdAt), "HH:mm dd/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Receive Address
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>
                  {order.specify} - {order.phoneNumber}
                </p>
                <p>{order.address}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Items
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {order.orderDetails.map((detail) => (
                <div key={detail._id} className="flex items-center space-x-4">
                  <img
                    src={
                      detail.productItem.product.avatar || "/placeholder.svg"
                    }
                    alt={detail.productItem.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {detail.productItem.product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {detail.quantity} x ${detail.productItem.product.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {detail.productItem.productSize.value} -{" "}
                      {detail.productItem.product.productColor.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ));
  };

  const orderStatus = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (data.length === 0) {
    return (
      <div className="container flex justify-center h-screen">
        <h2 className="text-4xl mt-10 text-center text-indigo-400">
          You have no orders
        </h2>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-transparent mb-8 text-3xl text-center uppercase bg-clip-text bg-gradient-to-b py-2 from-slate-500 to-sky-600 tracking-tighter">
        All Orders
      </h2>

      <div className="max-w-6xl space-y-8 w-full mx-auto px-4">
        <Tabs defaultValue="Pending">
          <TabsList className="mb-4 rounded-xl px-5">
            {orderStatus.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>

          {orderStatus.map((status: OrderStatus) => (
            <TabsContent className="space-y-8" key={status} value={status}>
              {renderOrdersByStatus(status)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UserOrders;
