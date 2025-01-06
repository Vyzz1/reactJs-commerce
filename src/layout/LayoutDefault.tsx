import Header from "@/components/shared/Header";
import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
  return (
    <>
      <Header />
      <main className=" antialiased min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutDefault;
