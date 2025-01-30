import DeleteService from "@/components/shared/DeleteService";
import OrderStatus from "@/components/shared/OrderStatus";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const ManageOrder = () => {
  useSetTitle("Manage Order");

  const {
    data: orders,
    isLoading,
    isError,
  } = useFetchData("/order/all", "", "private");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const columns: ColumnDef<OrderType>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {format(new Date(row.original.createdAt), "HH:mm dd/MM/yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.user.photoURL}
            alt="avatar"
            className="size-10 rounded-full"
          />
          <div className="space-y-3">
            <p className="text-slate-800 dark:text-emerald-100 text-sm">
              {row.original.user.firstName} {row.original.user.lastName}
            </p>
            <p className="text-muted-foreground text- ">
              {row.original.user.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Method" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full border border-sky-400">
            {row.original.method}
          </span>
          {row.original.method !== "cash" && (
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                row.original.statusPay === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {row.original.statusPay.toUpperCase()}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <OrderStatus _id={row.original._id} status={row.original.status} />
      ),
    },
    {
      accessorKey: "productItems",
      header: "Products",
      cell: ({ row }) => (
        <div className="flex gap-3 items-start flex-col justify-center">
          {row.original.orderDetails.map((detail) => (
            <div key={detail._id} className="flex items-center space-x-4 py-2">
              <img
                src={detail.productItem.product.avatar}
                alt={detail.productItem.product.name}
                className="size-14 object-cover aspect-square rounded-md"
              />
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-slate-900 dark:text-white truncate max-w-[150px]">
                        {detail.productItem.product.name}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      {detail.productItem.product.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm font-semibold">
                  {" "}
                  {detail.quantity} x ${detail.productItem.product.price}
                </p>
                <p className="text-black dark:text-white ">
                  {detail.productItem.productSize.value} -{" "}
                  {detail.productItem.product.productColor.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => (
        <span className="text-red-500 text-base font-beViet font-bold">
          ${row.original.total}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.original.referenceId)
                }
              >
                Copy Reference Id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>View Address Details</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>
                <DeleteService
                  endpoint={`/order/${row.original._id}`}
                  queryKey="/order/all"
                >
                  Delete
                </DeleteService>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewAddressDetails
            address={row.original.address}
            specify={row.original.specify}
            phoneNumber={row.original.phoneNumber}
            fullName={row.original.fullName}
          />
        </Dialog>
      ),
    },
  ];

  return (
    <section className="py-8">
      <h2 className="mb-8  uppercase text-2xl text-center dark:text-gray-300 text-sky-700">
        Mange Orders
      </h2>
      <DataTable columns={columns} data={orders} />
    </section>
  );
};

export default ManageOrder;

function ViewAddressDetails({ address, specify, phoneNumber, fullName }) {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Address Details</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground space-y-5">
          <h2 className="text-neutral-950 font-semibold dark:text-white">
            {fullName}
          </h2>
          <blockquote className="pl-3 border-l">
            {specify} - {phoneNumber}
          </blockquote>
          <p className="text-sm  text-black dark:text-white">{address}</p>
        </div>
      </DialogContent>
    </>
  );
}
