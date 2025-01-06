import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link } from "react-router-dom";
type ChangeAddressProps = {
  addresses: UserAddress[];
  setAddress: (address: string) => void;
};

const ChangeAddress = ({ addresses, setAddress }: ChangeAddressProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Address To Deliver</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 divide-y">
          <RadioGroup
            onValueChange={(v) => setAddress(v)}
            defaultValue={addresses
              .find((address) => address.isDefault)
              ?.id.toString()}
          >
            {addresses
              .sort(
                (a: UserAddress, b: UserAddress) =>
                  Number(b.isDefault) - Number(a.isDefault)
              )
              .map((address: UserAddress) => (
                <div
                  key={address.id}
                  className="flex items-center w-full gap-x-3"
                >
                  <RadioGroupItem
                    value={address.id.toString()}
                    id={address.id.toString()}
                  />
                  <div
                    className="flex justify-between py-3  items-center"
                    key={address.id}
                  >
                    <div className="space-y-4">
                      <div className="flex h-5 items-center space-x-4 text-sm">
                        <p className="font-normal tracking-wide text-base text-black dark:text-emerald-100">
                          {address.fullName}
                        </p>
                        <Separator orientation="vertical" />
                        <p className="text-muted-foreground">
                          {address.phoneNumber}
                        </p>
                      </div>
                      <div className="text-muted-foreground space-y-5">
                        <blockquote className="pl-3 border-l">
                          {address.specify}
                        </blockquote>
                        <p className="text-sm">
                          {address.province.split("-")[1]},{" "}
                          {address.district.split("-")[1]}, {address.ward}{" "}
                          {address.isDefault && <Badge>Default</Badge>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </RadioGroup>
        </div>
        <Link
          to={"/user/address"}
          className="text-sky-400 hover:underline text-sm "
        >
          Go to your addresses page to add or edit your address
        </Link>
        <DialogFooter>
          <DialogClose>
            <Button>Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddress;
