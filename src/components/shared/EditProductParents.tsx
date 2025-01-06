import { BrandFormType, CategoryFormType } from "@/zod";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import BrandForm from "./BrandForm";
import CategoryForm from "./CategoryForm";

type EditProductParents = {
  id: number;
  type: "brand" | "category";
  instance: CategoryFormType | BrandFormType;
};

const EditProductParents = ({ id, type, instance }: EditProductParents) => {
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
          <CategoryForm type="update" defaultValues={instance} id={id} />
        )}
        {type === "brand" && (
          <BrandForm type="update" defaultValues={instance} id={id} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditProductParents;
