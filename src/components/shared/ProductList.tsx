import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import NoDataState from "./NoDataState";

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="space-y-3  border rounded-sm border-slate-400"
    >
      <img
        src={product.avatar}
        alt={product.name}
        className="w-full cursor-pointer  object-cover aspect-square rounded-sm "
      />
      <div className="space-y-3 px-3 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-slate-950 text-start dark:text-slate-100 font-semibold line-clamp-1">
                {product.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>{product.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-amber-600 font-normal text-lg font-beViet">
          {product.price}$
        </p>
        <div className="flex items-center justify-between px-2">
          <Badge variant="outline" className="border border-zinc-700">
            <p>{product.colorName}</p>
          </Badge>
          <Badge variant="secondary">
            <p>{product.sizes?.length} Sizes</p>
          </Badge>
        </div>
      </div>
    </div>
  );
};

type ProductListProps = {
  products: Product[];
  className?: string;
};

const ProductList = ({ products, className }: ProductListProps) => {
  return (
    <>
      <div className={cn("gap-3", className)}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <NoDataState
          title="No Product Found"
          desc="We couldn't find any product matching your search criteria"
        />
      )}
    </>
  );
};

export default ProductList;
