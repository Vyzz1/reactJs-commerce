import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetchData from "@/hooks/useFetchData";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "@/components/shared/loader";

export default function PaymentSuccessPage() {
  const [param] = useSearchParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useFetchData(
    `/order/payment?referenceId=${param.get("referenceId")}`,
    "",
    "private"
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Thank you for your purchase, {order.fullName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Order Number:</span>
              <span className="font-bold">#{order._id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Date:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Order Summary
              </h3>
              {order.orderDetails.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.productItem.product.name} (x{item.quantity})
                  </span>
                  <span>${item.productItem.product.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm mt-2">
                <span className="font-medium">Shipping Fee:</span>
                <span>${order.shippingFee.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-4">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Shipping Details
              </h3>
              <p className="text-sm text-gray-600">{order.fullName}</p>
              <p className="text-sm text-gray-600">{order.address}</p>
              <p className="text-sm text-gray-600">{order.specify}</p>
              <p className="text-sm text-gray-600">
                Phone: {order.phoneNumber}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/search">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Continue Shopping
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
