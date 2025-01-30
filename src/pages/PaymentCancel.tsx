import { XCircle } from "lucide-react";
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
import HandleRepay from "@/components/shared/HandleRepay";

export default function PaymentCancel() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-700">
            Payment Failed
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            We're sorry, but there was an issue processing your payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Order Number:</span>
              <span className="font-bold">#{order._id}</span>
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <HandleRepay referenceId={param.get("referenceId")} />
          <Link to="/search">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Return to Shop
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
