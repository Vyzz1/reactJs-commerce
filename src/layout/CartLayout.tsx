import PersitentLogin from "./PersitentLogin";
import CheckoutProvider from "@/context/CheckoutContext";
import { Outlet } from "react-router-dom";

const CartLayout = () => {
  return (
    <PersitentLogin isInProtectedRoutes>
      <CheckoutProvider>
        <Outlet />
      </CheckoutProvider>
    </PersitentLogin>
  );
};

export default CartLayout;
