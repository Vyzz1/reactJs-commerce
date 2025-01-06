import CreateProductItem from "@/components/shared/CreateProductItem";
import DeleteService from "@/components/shared/DeleteService";
import EditProductItem from "@/components/shared/EditProductItem";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { useParams } from "react-router-dom";

const ProductConfig = () => {
  useSetTitle("Product Config ");

  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFetchData(
    `/product/${id}/config`,
    "",
    "private"
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const columns: ColumnDef<ProductItem>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
    },
    {
      accessorKey: "productSize.value",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Size" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 ">
          <EditProductItem
            prodcutId={parseInt(id)}
            productItem={row.original}
          />
          <DeleteService
            endpoint={`product-item/${row.original.id}`}
            queryKey={`/product/${id}/config`}
          >
            <Trash2Icon className="text-red-500" size={18} />
          </DeleteService>
        </div>
      ),
    },
  ];

  return (
    <section className="py-8 ">
      <div className="max-w-6xl mx-auto flex flex-col gap-y-5 px-4 w-full ">
        <h2 className="mb-8  uppercase text-2xl text-center text-sky-700">
          Product Config for ID: <span className="text-sky-700">{id}</span>
        </h2>
        <div className="w-full ml-auto">
          <CreateProductItem productId={parseInt(id)} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default ProductConfig;
