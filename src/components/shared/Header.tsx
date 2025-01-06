import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, SettingsIcon, SquareChartGantt } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "@/hooks/useLogout";
import ToggleCart from "./ToggleCart";
import PersitentLogin from "@/layout/PersitentLogin";
import { CommandMenu } from "./CommandMenu";

const Header = () => {
  const { currentUser } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  const isUser = currentUser?.role?.includes("USER");

  const pageNavigation = (
    <>
      <h2 className="text-slate-950 md:hidden dark:text-neutral-300 font-bold">
        Spring Commerce
      </h2>
      <Link
        to="/"
        className="text-base text-muted-foreground font-light hover:text-gray-900 dark:hover:text-gray-100"
      >
        Home
      </Link>
      <p className="text-base text-muted-foreground font-light hover:text-gray-900 dark:hover:text-gray-100">
        About
      </p>
      <p className="text-base text-muted-foreground font-light hover:text-gray-900 dark:hover:text-gray-100">
        Contact
      </p>
      <Link
        to="/search"
        className="text-base text-muted-foreground font-light hover:text-gray-900 dark:hover:text-gray-100"
      >
        Products
      </Link>
    </>
  );
  return (
    <header className="w-full z-[50] bg-white  dark:bg-[#09111f] sticky top-0 shadow-sm py-3 ">
      <div className=" w-full px-5 items-center flex justify-between">
        <Link to={"/"} className="text-base font-bold hidden lg:block">
          SpringCommerce
        </Link>
        <div className="md:flex gap-x-5 items-center hidden">
          {pageNavigation}
        </div>

        <div className="flex w-full lg:w-fit items-center gap-x-3">
          {/* Sheet for mobile  */}
          <Sheet>
            <SheetTrigger>
              <Menu className="size-6 md:hidden text-muted-foreground" />
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-y-5">{pageNavigation}</div>
            </SheetContent>
          </Sheet>

          {/* Toggle dark mode */}

          <ToggleTheme />

          <CommandMenu />

          {currentUser ? (
            <PersitentLogin isInProtectedRoutes={false}>
              {/* Cart */}

              {isUser && <ToggleCart />}

              {/* End Cart   */}

              {/* Menu  */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={currentUser?.photoUrl || "/user.png"} />
                    <AvatarFallback>
                      <Avatar></Avatar>
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px] ">
                  <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <Link to={isUser ? "/user" : "/admin"}>
                      <DropdownMenuItem className="text-md cursor-pointer">
                        {isUser ? "Profile" : "Settings"}

                        <DropdownMenuShortcut>
                          <SettingsIcon size={20} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>

                  {isUser && (
                    <Link to={"/orders"}>
                      <DropdownMenuItem className="lg:text-[15px] cursor-pointer">
                        Orders
                        <DropdownMenuShortcut>
                          <SquareChartGantt size={20} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="lg:text-[15px] cursor-pointer"
                  >
                    Logout
                    <DropdownMenuShortcut>
                      <IoIosLogOut size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* End Menu  */}
            </PersitentLogin>
          ) : (
            <Link
              to={"/login"}
              className="text-gray-900 font-normal dark:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
