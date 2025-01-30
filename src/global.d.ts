declare type NavbarProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

declare type UserAddress = {
  _id?: string;
  fullName: string;
  phoneNumber: string;
  district: string;
  province: string;
  ward: string;
  isDefault: boolean;
  specify: string;
};

declare type VariationOption = {
  _id: string;
  value: string;
  variation: {
    _id: string;
    name: string;
  };
};

declare type ProductSize = {
  _id: string;
  value: string;
};

declare type ProductItem = {
  _id: string;
  quantity: number;
  productSize: ProductSize;
  productName?: string;
  productPrice?: number;
  avatar?: string;
  color?: string;
  product: Product;
};

declare type CartItem = {
  _id: string;
  quantity: number;
  productName: string;
  product_id: string;
  productItem: ProductItem;
  image: string;
  productPrice: number;
  avatar: string;
  color?: string;
};

declare type Category = {
  _id: string;
  name: string;
  image: string;
};

declare type variationsTotal = Record<any, string[]>;

declare type Brand = {
  _id: string;
  name: string;
  image?: string;
};

declare type Product = {
  sizes: string[];
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: Category;
  price: number;
  productColor_id: string;
  colorName: string;
  brand: Brand;
  avatar: string;
  showHomepage: boolean;
  productItems?: ProductItem[];
  productColor: {
    _id: string;
    value: string;
  };
};

declare type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

declare type OrderDetails = {
  _id: string;
  quantity: number;
  productItem: ProductItem;
};

declare type OrderType = {
  _id: string;
  createdAt: Date;
  orderDetails: OrderDetails[];
  shippingFee: number;
  user: User;
  status: OrderStatus;
  total: number;
  address: string;
  specify: string;
  phoneNumber: string;
  method: "cash" | "stripe";
  statusPay: string;
  referenceId: string;
  fullName: string;
};

declare type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob?: string;
  photoURL?: string;
};

declare interface SmallProduct {
  name: string;
  price: number;
  quantity: number;
  avatar: string;
  color: string;
  size: string;
  _id: string;
}

declare interface Payment {
  _id: string;
  total: number;
  method: string;
  status: string;
  user: User;
  product: Array<SmallProduct>;
  referenceId: string;
  createdAt: string;
}
