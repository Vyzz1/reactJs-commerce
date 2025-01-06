import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const UserOrders = () => {
  useSetTitle("Your orders");

  const { data, isLoading, isError } = useFetchData(
    "order/auth",
    "",
    "private"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occurred</div>;
  }
  const renderOrdersByStatus = (status: OrderStatus) => {
    return data
      .filter((order: OrderType) => order.status === status)
      .map((order: OrderType) => (
        <div
          key={order.id}
          className="border dark:border-zinc-200 shadow-sm rounded-lg p-6"
        >
          <div className="mb-4 space-y-3">
            <Link
              to={`/order/${order.id}`}
              className="text-lg font-semibold italic text-sky-500 dark:text-gray-200 hover:underline"
            >
              Order ID: {order.id}
            </Link>
            <p className="text-base text-slate-600 dark:text-white">
              Status: {order.status}
            </p>
            <p className="text-red-500 text-base">Total: ${order.total}</p>
            <p className="text-sm italic">Shipping Fee: ${order.shippingFee}</p>
            <p className="text-muted-foreground">
              Date: {format(new Date(order.createdAt), "HH:mm dd/MM/yyyy")}
            </p>
            <div className="text-muted-foreground dark:text-white space-y-5 mt-3">
              <h2 className="text-slate-950 dark:text-white">
                Recieve Address:
              </h2>
              <blockquote className="pl-3 border-l dark:border-white">
                {order.address.specify} - {order.address.phoneNumber}
              </blockquote>
              <p className="text-sm">
                {order.address.province.split("-")[1]},{" "}
                {order.address.district.split("-")[1]}, {order.address.ward}
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            {order.orderDetails.map((detail) => (
              <div key={detail.id} className="flex items-center space-x-4 py-2">
                <img
                  src={detail.productItem.avatar}
                  alt={detail.productItem.productName}
                  className="size-20 object-cover aspect-square rounded-md"
                />
                <div className="space-y-2">
                  <p className="text-slate-900 dark:text-white">
                    {detail.productItem.productName}
                  </p>
                  <p className="text-sm font-semibold">
                    {detail.quantity} x ${detail.productItem.productPrice}
                  </p>
                  <p className="text-black dark:text-white">
                    {detail.productItem.productSize.value} -{" "}
                    {detail.productItem.color}
                  </p>
                </div>
              </div>
            ))}
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
      <h2 className="text-transparent mb-8 text-3xl text-center uppercase bg-clip-text bg-gradient-to-b py-2 from-slate-400 to-indigo-600">
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
