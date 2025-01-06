const iconClassName = " dark:text-neutral-200 h-5 w-5 flex-shrink-0";
import {
  Grid2X2Icon,
  HexagonIcon,
  LockIcon,
  Settings2Icon,
  SettingsIcon,
  SquareChartGanttIcon,
  UsersRound,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import { PiAddressBookLight } from "react-icons/pi";
import { FaTruckMoving, FaUserAstronaut } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { SiAdidas, SiJordan, SiNike, SiPuma } from "react-icons/si";

interface NavbarType {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const userNavbar: NavbarType[] = [
  {
    label: "Information",
    href: "/user",
    icon: <FaUserAstronaut className={iconClassName} />,
  },
  {
    label: "Update Your Address",
    href: "/user/address",
    icon: <PiAddressBookLight className={iconClassName} />,
  },

  {
    label: "Change Password",
    icon: <LockIcon className={iconClassName} />,
    href: "/user/change-password",
  },
  {
    label: "Change Your Avatar",
    icon: <RxAvatar className={iconClassName} />,
    href: "/user/update-avatar",
  },
];
export const adminNavbar: NavbarType[] = [
  {
    label: "Category",
    href: "/admin",
    icon: <Grid2X2Icon className={iconClassName} />,
  },
  {
    label: "Brand",
    href: "/admin/brand",
    icon: <HexagonIcon className={iconClassName} />,
  },
  {
    label: "Manage User",
    href: "/admin/manage-users",
    icon: <UsersRound className={iconClassName} />,
  },
  {
    label: "Manage Product",
    href: "/admin/manage-product",
    icon: <Settings2Icon className={iconClassName} />,
  },
  {
    label: "Manage Orders",
    href: "/admin/manage-orders",
    icon: <SquareChartGanttIcon className={iconClassName} />,
  },

  {
    label: "Product Config",
    icon: <SettingsIcon className={iconClassName} />,
    href: "/admin/product-config",
  },

  {
    label: "Change Password",
    icon: <LockIcon className={iconClassName} />,
    href: "/admin/change-password",
  },
];
export const productDetailsAdvertisement = [
  {
    title: "Free Shipping on Orders Over $400",
    icon: (
      <FaTruckMoving className=" text-slate-700 size-6 dark:text-gray-100" />
    ),
  },
  {
    title: "100% Money Back Guarantee",
    icon: <FcMoneyTransfer className="size-6" />,
  },
  {
    title: "24/7 Customer Service",
    icon: (
      <FaUserAstronaut className="text-slate-700 size-6 dark:text-gray-100" />
    ),
  },
];

interface HeroIcon {
  title: string;
  icon: JSX.Element;
}

export const heroIcons: HeroIcon[] = [
  {
    title: "Nike",
    icon: <SiNike className=" inline" size={55} color="#ccc" />,
  },
  {
    title: "Adidas",
    icon: <SiAdidas className=" inline" size={55} color="#ccc" />,
  },
  {
    title: "Jordan",
    icon: <SiJordan className=" inline" size={55} color="#ccc" />,
  },
  {
    title: "Puma",
    icon: <SiPuma className=" inline" size={55} color="#ccc" />,
  },
];

export const SHPPING_FEE = 5;
