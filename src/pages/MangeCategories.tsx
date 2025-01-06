import AddProductParents from "@/components/shared/AddProductParents";
import DeleteService from "@/components/shared/DeleteService";
import EditProductParents from "@/components/shared/EditProductParents";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

const MangeCategories = () => {
  useSetTitle("Manage Categories");

  const {
    data: categories,
    isLoading,
    isError,
  } = useFetchData("/category/all", "", "normal");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <EditProductParents
              instance={row.original}
              type="category"
              id={row.original.id}
            />
            <DeleteService
              endpoint={`category/${row.original.id}`}
              queryKey="/category/all"
            >
              <Trash2Icon className="h-5 w-5" />
            </DeleteService>
          </div>
        );
      },
    },
  ];

  return (
    <section className="py-8 ">
      <h2 className="mb-8  uppercase text-2xl text-center text-sky-700">
        Mange Categories
      </h2>
      <div className="ml-auto">
        <AddProductParents type="category" />
      </div>
      <DataTable columns={columns} data={categories} />
    </section>
  );
};

export default MangeCategories;
