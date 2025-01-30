import Loader from "@/components/shared/loader";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { ColumnDef } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserPayments = () => {
  const {
    data: payments,
    isLoading,
    isError,
  } = useFetchData("/payment/user", "", "private");
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="max-w-[240px] truncate">
                      <span className="text-slate-950 dark:text-emerald-100 tracking-tight max-w-[240px] truncate ">
                        {item.name} ({item.size} - {item.color})
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className=" tracking-tight ">{item.name}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
  ];

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.total,
    0
  );
  const averageOrderValue = totalRevenue / payments.length;

  return (
    <section className="py-8 px-4">
      <div className="container">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Payments
        </h2>
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
              <CardTitle className="text-sm font-semibold">
                Recent Purchased Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {payments[0].product.slice(0, 2).map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="text-slate-950 dark:text-emerald-100 text-sm tracking-tight max-w-[240px] truncate ">
                      {item.name}
                    </span>
                    <XIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">
                      {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <DataTable columns={columns} data={payments} />
      </div>
    </section>
  );
};

export default UserPayments;
