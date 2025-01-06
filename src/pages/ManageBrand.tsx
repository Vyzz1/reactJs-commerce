import AddProductParents from "@/components/shared/AddProductParents";
import DeleteService from "@/components/shared/DeleteService";
import EditProductParents from "@/components/shared/EditProductParents";
import { DataTable } from "@/components/ui/DataTable";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

const ManageBrand = () => {
  useSetTitle("Manage Brand");

  const {
    data: categories,
    isLoading,
    isError,
  } = useFetchData("/brand/all", "", "normal");
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <EditProductParents
              type="brand"
              instance={row.original}
              id={row.original.id}
            />
            <DeleteService
              endpoint={`brand/${row.original.id}`}
              queryKey="/brand/all"
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
        Mange Brands
      </h2>
      <div className="max-w-6xl mx-auto w-full ">
        <div className="ml-auto">
          <AddProductParents type="brand" />
        </div>
        <DataTable columns={columns} data={categories} />
      </div>
    </section>
  );
};

export default ManageBrand;
