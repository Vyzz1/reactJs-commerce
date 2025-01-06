import DeleteService from "@/components/shared/DeleteService";
import ToggleQuantity from "@/components/shared/ToggleQuantity";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckoutContext } from "@/context/CheckoutContext";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { Trash2Icon } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserCart = () => {
  useSetTitle("Your shopping cart");
  const navigate = useNavigate();

  const {
    data: carts,
    isLoading,
    isError,
  } = useFetchData("/cart/auth", "", "private");
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const { updateProducts, setTotalCost } = useContext(CheckoutContext);

  const total = useMemo(() => {
    return selectedItems.reduce(
      (acc: number, cart: CartItem) => acc + cart.productPrice * cart.quantity,
      0
    );
  }, [selectedItems]);

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    const updatedSelectedItems = selectedItems.map((item) =>
      item.id === cartId ? { ...item, quantity: newQuantity } : item
    );

    setSelectedItems(updatedSelectedItems);
  };

  const handleDelete = (cartId: number) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item.id !== cartId
    );
    setSelectedItems(updatedSelectedItems);

    // const newTotal = updatedSelectedItems.reduce(
    //   (acc: number, cart: CartItem) => acc + cart.productPrice * cart.quantity,
    //   0
    // );
    // setTotalCost(newTotal);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>An error occurred</p>;
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.info("Please select items to checkout");
      return;
    }
    updateProducts(selectedItems);
    setTotalCost(total);
    navigate("/checkout");
  };

  if (carts.length === 0) {
    return (
      <div className="container flex justify-center h-screen">
        <h2 className="text-4xl mt-10 text-center text-indigo-400">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <section className="p-8 container">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-transparent mb-8 text-3xl text-center uppercase bg-clip-text bg-gradient-to-b py-2 from-slate-400 to-indigo-600 ">
          Your Shopping Cart
        </h2>

        <div className="mr-auto space-x-2 flex items-center mb-4">
          <Checkbox
            id="all"
            checked={selectedItems.length === carts.length}
            onCheckedChange={() => {
              if (selectedItems.length === carts.length) {
                setSelectedItems([]);
                return;
              }
              setSelectedItems(carts);
            }}
          />
          <Label>Select All</Label>
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 max-w-4xl  gap-4  w-full overflow-auto ">
          {carts.map((cart: CartItem) => (
            <div
              key={cart.id}
              className="space-y-6  lg:w-full  py-3 px-2 border "
            >
              <div className="relative">
                <img
                  src={cart.avatar}
                  alt={cart.productName}
                  className=" h-fit  aspect-square object-cover rounded-sm"
                />
                <Checkbox
                  id={cart.id.toString()}
                  checked={selectedItems.some((item) => item.id === cart.id)}
                  onCheckedChange={() => {
                    if (selectedItems.some((item) => item.id === cart.id)) {
                      setSelectedItems(
                        selectedItems.filter((item) => item.id !== cart.id)
                      );
                      return;
                    }
                    setSelectedItems([...selectedItems, cart]);
                  }}
                  className=" absolute top-1 left-1"
                />
              </div>
              <div className="space-y-1">
                <p className="text-base text-slate-600  dark:text-white lg:max-w-full  text-nowrap truncate ">
                  {cart.productName}
                </p>
                <p className="text-muted-foreground text-sm">
                  {cart.productItem.productSize.value} - {cart.color}
                </p>
                <p className="text-base text-red-500 py-1 text-center font-semibold">
                  ${cart.productPrice}
                </p>
                <div className="flex items-center justify-center">
                  <ToggleQuantity
                    quantity={cart.quantity}
                    cartId={cart.id}
                    onQuantityChange={(v) => handleQuantityChange(cart.id, v)}
                    max={cart.productItem.quantity}
                  />
                </div>
                <div className="flex !mt-3 justify-center items-center">
                  <DeleteService
                    endpoint={`cart/${cart.id}`}
                    queryKey={"/cart/auth"}
                    onDeleted={() => handleDelete(cart.id)}
                  >
                    <Button size="sm" variant="destructive">
                      <Trash2Icon className="size-4 mr-2" />
                      Remove
                    </Button>
                  </DeleteService>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" px-8 flex justify-end bottom-0 w-full py-8">
          <div className="space-y-3">
            <p>
              Total: <span className="font-semibold">${total}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCart;
