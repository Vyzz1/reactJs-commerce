import AddConfig from "@/components/shared/AddConfig";
import DeleteService from "@/components/shared/DeleteService";
import { DataTableColumnHeader } from "@/components/ui/ColumnHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import React from "react";

const MangeConfig = () => {
  useSetTitle("Manage Config");

  const {
    data: sizes,
    isLoading: sizeLoading,
    isError: sizeError,
  } = useFetchData("/size/all", "", "normal");

  const {
    data: colors,
    isLoading: colorLoading,
    isError: colorError,
  } = useFetchData("/color/all", "", "normal");
  if (sizeLoading || colorLoading) return <div>Loading...</div>;
  if (sizeError || colorError) return <div>Error</div>;
  const sizeColumns: ColumnDef<ProductSize>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Size" />;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <DeleteService
              endpoint={`size/${row.original.id}`}
              queryKey="/size/all"
            >
              <Trash2Icon className="h-5 w-5" />
            </DeleteService>
          </div>
        );
      },
    },
  ];

  const colorColumns: ColumnDef<ProductSize>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Color" />;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <DeleteService
              endpoint={`color/${row.original.id}`}
              queryKey="/color/all"
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
        Manage Product Configuration
      </h2>
      <Separator />
      <h3 className="text-xl text-sky-700 my-6">Sizes</h3>
      <div className="ml-auto">
        <AddConfig type="size" />
      </div>
      <DataTable columns={sizeColumns} data={sizes} />

      <Separator />
      <h3 className="text-xl text-sky-700 my-6">Colors</h3>
      <div className="ml-auto">
        <AddConfig type="color" />
      </div>
      <DataTable columns={colorColumns} data={colors} />
    </section>
  );
};

export default MangeConfig;
