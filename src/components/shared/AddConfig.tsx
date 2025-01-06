import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import ConfigForm from "./ConfigForm";
type AddConfigProps = {
  type: "size" | "color";
};
const AddConfig = ({ type }: AddConfigProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Add {type === "size" ? "Size" : "Color"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add {type === "size" ? "Size" : "Color"}</DialogHeader>
        <ConfigForm type="create" configType={type} />
      </DialogContent>
    </Dialog>
  );
};

export default AddConfig;
