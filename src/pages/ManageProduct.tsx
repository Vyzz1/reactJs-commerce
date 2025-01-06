import DeleteService from "@/components/shared/DeleteService";
import ShowHomepageCheck from "@/components/shared/ShowHomepageCheck";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  useSetTitle("Manage Product");

  const {
    data: products,
    isLoading,
    isError,
  } = useFetchData("/product/all", "", "private");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "showHomepage",
      header: "Show",
      cell: ({ row }) => {
        return (
          <ShowHomepageCheck
            id={row.original.id}
            showHomepage={row.original.showHomepage}
          />
        );
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <Link
            to={`/product/${row.original.id}`}
            className="text-gray-950 dark:text-white hover:underline"
          >
            {row.original.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
    },
    {
      accessorKey: "category.name",
      header: "Category",
    },
    {
      accessorKey: "brand.name",
      header: "Brand",
    },
    {
      header: "Image",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.avatar}
            className="object-cover w-16 aspect-square h-auto rounded-md"
            alt={row.original.name}
          />
        );
      },
    },
    {
      header: "Colors",
      cell: ({ row }) => {
        return <Badge> {row.original.colorName} </Badge>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-2 items-center ">
            <Link
              to={`/admin/update-product/${row.original.id}`}
              className="text-sky-400 hover:underline"
            >
              Edit
            </Link>
            <DeleteService
              endpoint={`product/${row.original.id}`}
              queryKey="/product/all"
            >
              <Trash2Icon className="size-5 text-red-500" />
            </DeleteService>
          </div>
        );
      },
    },
  ];
  return (
    <section className="py-8">
      <div className="container  mx-auto">
        <h2 className="mb-8  uppercase text-2xl text-center text-sky-700">
          Manage Product
        </h2>
        <div className="ml-auto">
          <Link to={"/admin/create-product"}>
            <button className="inline-flex h-10 text-sm animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Create Product
            </button>
          </Link>
        </div>
        <DataTable filterInput="name" columns={columns} data={products} />
      </div>
    </section>
  );
};

export default ManageProduct;
