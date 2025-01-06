import DeleteService from "@/components/shared/DeleteService";
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

const ManageUser = () => {
  useSetTitle("Mange User");

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchData("/auth/admin/all-user", "", "private");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
      cell: ({ row }) => {
        const dob = row.original?.dob;
        const formattedDate = dob ? format(new Date(dob), "dd/MM/yyyy") : "N/A";
        return <span className="text-muted-foreground">{formattedDate}</span>;
      },
    },
    {
      accessorKey: "photoURL",
      header: "Avatar",
      cell: ({ row }) => (
        <img
          src={row.original.photoURL ?? "/user.png"}
          className="object-cover w-16 aspect-square h-auto rounded-md"
          alt={row.original.firstName}
        />
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <DeleteService
              endpoint={`/auth/admin/user/${row.original.id}`}
              queryKey="/auth/admin/all-user"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="text-red-500 text-sm hover:underline">
                      Delete
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-muted-foreground">
                      This will delete the user and all related data.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DeleteService>
          </div>
        );
      },
    },
  ];
  return (
    <section className="py-8">
      <h2 className="mb-8  uppercase text-2xl text-center dark:text-gray-300 text-sky-700">
        Mange Users
      </h2>
      <DataTable columns={columns} data={users} />
    </section>
  );
};

export default ManageUser;
