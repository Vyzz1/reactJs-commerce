import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";

import { Outlet } from "react-router-dom";
import PersitentLogin from "./PersitentLogin";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [animated, setAnimated] = useState(true);

  return (
    <>
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} animate={animated}>
          <SidebarBody className="justify-between min-h-screen !max-h-full h-auto gap-10 aside-nav">
            <div className="flex flex-col justify-between flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col space-y-10">{children}</div>

              {/* Toggle Animation for Sidebar */}
              {animated ? (
                <ToggleRightIcon
                  className="stroke-zinc-800 font-semibold h-7 w-7 cursor-pointer"
                  onClick={() => setAnimated(false)}
                />
              ) : (
                <ToggleLeftIcon
                  className="stroke-zinc-800 font-semibold h-7 w-7 cursor-pointer"
                  onClick={() => setAnimated(true)}
                />
              )}
            </div>
          </SidebarBody>
        </Sidebar>
        <PersitentLogin isInProtectedRoutes>
          <main className="container w-full">
            <Outlet />
          </main>
        </PersitentLogin>
      </div>
    </>
  );
};

export default SettingLayout;
