import DeleteService from "@/components/shared/DeleteService";
import OrderStatus from "@/components/shared/OrderStatus";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";

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
        <span className="text-muted-foreground">
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
            className="w-8 h-8 rounded-full"
          />
          <div className="space-y-3">
            <p className="text-slate-800 text-sm">
              {row.original.user.firstName} {row.original.user.lastName}
            </p>
            <p className="text-muted-foreground text-xs">
              {row.original.user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="text-muted-foreground space-y-5">
          <blockquote className="pl-3 border-l">
            {row.original.address.specify}
          </blockquote>
          <p className="text-sm line-clamp-1">
            {row.original.address.province.split("-")[1]},{" "}
            {row.original.address.district.split("-")[1]},{" "}
            {row.original.address.ward}{" "}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <OrderStatus id={row.original.id} status={row.original.status} />
      ),
    },
    {
      accessorKey: "productItems",
      header: "Products",
      cell: ({ row }) => (
        <div className="flex gap-3 items-start flex-col justify-center">
          {row.original.orderDetails.map((detail) => (
            <div key={detail.id} className="flex items-center space-x-4 py-2">
              <img
                src={detail.productItem.avatar}
                alt={detail.productItem.productName}
                className="size-14 object-cover aspect-square rounded-md"
              />
              <div className="space-y-2">
                <p className="text-slate-900 dark:text-white line-clamp-1 truncate">
                  {detail.productItem.productName}
                </p>
                <p className="text-sm font-semibold">
                  {" "}
                  {detail.quantity} x ${detail.productItem.productPrice}
                </p>
                <p className="text-black dark:text-white ">
                  {detail.productItem.productSize.value} -{" "}
                  {detail.productItem.color}
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
        <span className="text-red-500">${row.original.total}</span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <DeleteService
            endpoint={`order/${row.original.id}`}
            queryKey="/order/all"
          >
            <TrashIcon className="size-5 text-red-500" />
          </DeleteService>
        </div>
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
