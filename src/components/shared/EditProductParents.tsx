import { BrandFormType, CategoryFormType } from "@/zod";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import BrandForm from "./BrandForm";
import CategoryForm from "./CategoryForm";

type EditProductParents = {
  _id: string;
  type: "brand" | "category";
  instance: CategoryFormType | BrandFormType;
};

const EditProductParents = ({ _id, type, instance }: EditProductParents) => {
  return (
    <Sheet>
      <SheetTrigger>
        <p className="text-sky-400 hover:underline text-sm">Edit</p>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          Edit {type === "brand" ? "Brand" : "Category"}
        </SheetHeader>
        {type === "category" && (
          <CategoryForm type="update" defaultValues={instance} _id={_id} />
        )}
        {type === "brand" && (
          <BrandForm type="update" defaultValues={instance} _id={_id} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditProductParents;
