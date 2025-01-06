declare type NavbarProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

declare type UserAddress = {
  id?: number;
  fullName: string;
  phoneNumber: string;
  district: string;
  province: string;
  ward: string;
  isDefault: boolean;
  specify: string;
};

declare type VariationOption = {
  id: number;
  value: string;
  variation: {
    id: number;
    name: string;
  };
};

declare type ProductSize = {
  id: number;
  value: string;
};

declare type ProductItem = {
  id: number;
  quantity: number;
  productSize: ProductSize;
  sku: string | null;
  productName?: string;
  productPrice?: number;
  avatar?: string;
  color?: string;
};

declare type CartItem = {
  id: number;
  quantity: number;
  productName: string;
  productId: number;
  productItem: ProductItem;
  image: string;
  productPrice: number;
  avatar: string;
  color?: string;
};

declare type Category = {
  id: number;
  name: string;
  image: string;
};

declare type variationsTotal = Record<any, string[]>;

declare type Brand = {
  id: number;
  name: string;
  image?: string;
};

declare type Product = {
  sizes: string[];
  id: number;
  name: string;
  description: string;
  images: string[];
  category: Category;
  price: number;
  productColorId: number;
  colorName: string;
  brand: Brand;
  avatar: string;
  showHomepage: boolean;
  productItems?: ProductItem[];
};

declare type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

declare type OrderDetails = {
  id: number;
  quantity: number;
  productItem: ProductItem;
};

declare type OrderType = {
  id: number;
  createdAt: Date;
  orderDetails: OrderDetails[];
  shippingFee: number;
  user: User;
  status: OrderStatus;
  address: UserAddress;
  total: number;
};

declare type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob?: string;
  photoURL?: string;
};
