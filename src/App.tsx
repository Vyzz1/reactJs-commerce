import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutDefault from "./layout/LayoutDefault";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layout/AuthLayout";
import { adminNavbar, userNavbar } from "./data";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import UserAddresses from "./pages/UserAddresses";
import ChangePassword from "./pages/ChangePasword";
import UpdateLogo from "./pages/UpdateLogo";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";
import CreateProduct from "./pages/CreateProduct";
import ManageProduct from "./pages/ManageProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProductConfig from "./pages/ProductConfig";
import UserCart from "./pages/UserCart";
import Checkout from "./pages/Checkout";
import CartLayout from "./layout/CartLayout";
import UserOrders from "./pages/UserOrders";
import OrderDetails from "./pages/OrderDetails";
import Search from "./pages/Search";
import MangeCategories from "./pages/MangeCategories";
import ManageBrand from "./pages/ManageBrand";
import ManageConfig from "./pages/MangeConfig";

import ManageUser from "./pages/ManageUser";
import ManageOrder from "./pages/ManageOrder";
import { AvatarUpdateForm } from "./pages/AvatarUpdateForm";
import PaymentSuccessPage from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import ManagePayments from "./pages/ManagePayments";
import UserPayments from "./pages/UserPayments";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/forgot",
          element: <ForgotPassword />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "/success",
          element: <PaymentSuccessPage />,
        },
        {
          path: "cancel",
          element: <PaymentCancel />,
        },
        {
          element: <CartLayout />,
          children: [
            {
              path: "cart",
              element: <UserCart />,
            },
            {
              path: "/checkout",
              element: <Checkout />,
            },
            {
              path: "/orders",
              element: <UserOrders />,
            },
            {
              path: "/order/:id",
              element: <OrderDetails />,
            },
          ],
        },

        {
          path: "/user",
          element: (
            <AuthLayout allowedRole={["ROLE_USER"]} navbar={userNavbar} />
          ),
          children: [
            {
              index: true,
              element: <UserProfile />,
            },
            {
              path: "address",
              element: <UserAddresses />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
            {
              path: "update-avatar",
              element: <AvatarUpdateForm />,
            },
            {
              path: "history-payments",
              element: <UserPayments />,
            },
          ],
        },
        {
          path: "/admin",
          element: (
            <AuthLayout allowedRole={["ROLE_ADMIN"]} navbar={adminNavbar} />
          ),
          children: [
            {
              index: true,
              element: <MangeCategories />,
            },
            {
              path: "manage-users",
              element: <ManageUser />,
            },
            {
              path: "brand",
              element: <ManageBrand />,
            },
            {
              path: "create-product",
              element: <CreateProduct />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
            {
              path: "manage-payments",
              element: <ManagePayments />,
            },
            {
              path: "product-config",
              element: <ManageConfig />,
            },
            {
              path: "manage-orders",
              element: <ManageOrder />,
            },
            {
              path: "update-logo",
              element: <UpdateLogo />,
            },
            {
              path: "manage-product",
              element: <ManageProduct />,
            },
            {
              path: "update-product/:id",
              element: <UpdateProduct />,
            },
            {
              path: "product/:id/config",
              element: <ProductConfig />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
