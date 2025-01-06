import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import BrandForm from "./BrandForm";
import CategoryForm from "./CategoryForm";

type AddProductParentsProps = {
  type: "category" | "brand";
};

const AddProductParents = ({ type }: AddProductParentsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {type === "category" ? "Add Category" : "Add Brand"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Add {type === "brand" ? "Brand" : "Category"}
        </DialogHeader>
        {type === "category" && <CategoryForm type="create" />}
        {type === "brand" && <BrandForm type="create" />}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductParents;
