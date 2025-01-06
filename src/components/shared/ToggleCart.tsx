import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import DeleteService from "./DeleteService";
import { Link } from "react-router-dom";

const ToggleCart = () => {
  const {
    data: carts,
    isLoading,
    isError,
  } = useFetchData("/cart/auth", "", "private");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <ShoppingCartIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="!max-w-md">
        <SheetHeader>
          <SheetTitle className="text-cyan-500 font-normal">
            Your Shopping Cart ({carts?.length ?? 0})
          </SheetTitle>
          <SheetDescription>
            Go to your cart to see the items you saved
          </SheetDescription>
        </SheetHeader>

        <div className="flex divide-y space-y-5 mt-8 flex-col overflow-y-auto max-h-[500px]">
          {carts?.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-y-3">
              <ShoppingCartIcon className="size-16 text-gray-300" />
              <p className="text-lg text-gray-300">Your cart is empty</p>
            </div>
          )}
          {isLoading ? (
            <>
              <div className="flex flex-col items-center justify-center gap-y-3">
                <ShoppingCartIcon className="size-16 text-gray-300" />
                <p className="text-lg text-gray-300">Loading...</p>
              </div>
            </>
          ) : isError ? (
            <>
              <div className="flex flex-col items-center justify-center gap-y-3">
                <ShoppingCartIcon className="size-16 text-gray-300" />
                <p className="text-lg text-gray-300">An error occurred</p>
              </div>
            </>
          ) : (
            carts?.map((cart: CartItem) => (
              <div
                className="py-2 flex xl:flex-row flex-col gap-y-2 justify-between items-center xl:items-start"
                key={cart.id}
              >
                <div className=" flex items-center gap-x-3">
                  <img
                    src={cart.avatar}
                    alt={cart.productName}
                    loading="lazy"
                    className="size-28 aspect-square object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-y-3 ite">
                    <div className="space-y-1">
                      <p className="text-base font-semibold max-w-[200px] truncate">
                        {cart.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cart.productItem.productSize.value} - {cart.color}
                      </p>
                      <p className="text-sm">
                        Quantity :{" "}
                        <span className="text-sky-500">{cart.quantity}</span>
                      </p>
                    </div>

                    <DeleteService
                      endpoint={`cart/${cart.id}`}
                      queryKey="/cart/auth"
                    >
                      <div className="gap-x-1 max-w-[100px] items-center cursor-pointer flex">
                        <XIcon className="size-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">Remove</span>
                      </div>
                    </DeleteService>
                  </div>
                </div>
                <p className="text-base text-red-500 font-semibold font-inter">
                  {cart.productPrice}$
                </p>
              </div>
            ))
          )}
        </div>

        {carts?.length > 0 && (
          <SheetFooter className="mt-5">
            <Link to={"/cart"}>
              <Button
                size="sm"
                className="block w-full px-6 py-2 bg-black dark:bg-slate-700 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 "
              >
                Go to Cart
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ToggleCart;
