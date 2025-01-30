import Loader from "@/components/shared/loader";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ManagePayments = () => {
  const {
    data: payments,
    isLoading,
    isError,
  } = useFetchData("/payment", "", "private");
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString();
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium text-red-500 ">{formatted}</div>;
      },
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col space-y-1">
            {row.original.product.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="text-slate-950 dark:text-emerald-100 tracking-tight truncate max-w-[180px]">
                  {item.name}
                </span>
                <XIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => (
        <div className="space-y-2">
          <p className="text-slate-950  dark:text-emerald-100 font-semibold truncate max-w-[150px]">
            {row.original.user.firstName} {row.original.user.lastName}
          </p>
          <p className="text-sm text-gray-500 ">{row.original.user.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Method" />
      ),
      cell: ({ row }) => {
        return (
          <span className="px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full border border-sky-400">
            {row.original.method}
          </span>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              row.original.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row.original.status.toUpperCase()}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.original.referenceId)
                }
              >
                Copy Reference Id
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem>View Products Details</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewProduct product={row.original.product} />
        </Dialog>
      ),
    },
  ];

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.total,
    0
  );
  const averageOrderValue = totalRevenue / payments.length;
  const bestSellingProducts = payments.reduce((acc, payment: Payment) => {
    payment.product.forEach((item) => {
      if (acc[item.name]) {
        acc[item.name].quantity += item.quantity;
      } else {
        acc[item.name] = { ...item };
      }
    });
    return acc;
  }, {} as Record<string, { quantity: number; name: string; price: number }>);

  const sortedBestSellingProducts = Object.values(bestSellingProducts)
    .sort((a: any, b: any) => b.quantity - a.quantity)
    .slice(0, 1);

  return (
    <section className="py-8 px-4">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Manage Payments</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(averageOrderValue)}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Best Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <p className="text-slate-700">
                  {(sortedBestSellingProducts[0] as any).name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(sortedBestSellingProducts[0] as any).quantity} Sold
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DataTable data={payments} columns={columns} />
      </div>
    </section>
  );
};
const ViewProduct = ({ product }: { product: Array<SmallProduct> }) => {
  console.log(product);

  return (
    <DialogContent>
      {product.map((item) => (
        <div className="py-2 px-2">
          <div className="flex items-center gap-4">
            <img
              src={item.avatar}
              alt="product image"
              className="size-16 rounded-2xl object-cover"
            />
            <div className="space-y-2">
              <p className="text-slate-800 dark:text-white text-sm font-semibold max-w-[250px]">
                {item.name}
              </p>
              <div className="flex justify-between items-center">
                <div className="space-x-2 flex items-center">
                  <p className="text-sm text-red-600 font-semibold">
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <XIcon className="size-3 text-gray-500" />
                  <p className="text-zinc-500 text-xs font-semibold">
                    {item.quantity}
                  </p>
                </div>
                <p className="text-sm text-emerald-400 font-semibold">
                  {item.size} | {item.color}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </DialogContent>
  );
};

export default ManagePayments;
