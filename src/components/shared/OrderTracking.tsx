import { FileText, Truck, Package, CheckIcon } from "lucide-react";
import clsx from "clsx";

type Steps = {
  id: number;
  label: string;
  icon: JSX.Element;
  status: OrderStatus;
};

const steps: Steps[] = [
  { id: 1, label: "Pending Order", icon: <FileText />, status: "Pending" },
  { id: 2, label: "Order Confirmed", icon: <CheckIcon />, status: "Confirmed" },
  { id: 3, label: "Order Shipped", icon: <Truck />, status: "Shipped" },
  { id: 4, label: "Order Delivered", icon: <Package />, status: "Delivered" },
];

const OrderTracking = ({ status }: { status: OrderStatus }) => {
  const activeStep = steps.find((s) => s.status === status);

  return (
    <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base  ">
      {steps.map((step) => {
        return (
          <li
            className={clsx(
              "flex w-full relative text-muted-foreground after:content-[''] after:bg-gray-300  after:w-full after:h-0.5    after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-8  ",
              {
                "text-sky-400 ": activeStep.id >= step.id,
                "after:hidden": step.id === 4,
                "after:!bg-indigo-600": activeStep.id > step.id,
              }
            )}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={clsx(
                  "size-12 bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:size-12",
                  {
                    "!bg-gray-300 text-gray-300": activeStep.id < step.id,
                  }
                )}
              >
                {step.icon}
              </span>{" "}
              {step.label}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default OrderTracking;
