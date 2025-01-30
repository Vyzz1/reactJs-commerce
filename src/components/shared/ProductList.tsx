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
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
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
        <p className="text-red-400 font-bold text-lg font-beViet">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
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
  isLoading?: boolean;
};

const ProductList = ({ products, className, isLoading }: ProductListProps) => {
  return (
    <>
      <div className={cn("gap-3", className)}>
        {!isLoading ? (
          <>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </>
        ) : (
          <>
            {...new Array(4)
              .fill(0)
              .map((_, i) => <ProductCardSkeleton key={i} />)}
          </>
        )}
      </div>
      {!isLoading && products?.length === 0 && (
        <NoDataState
          title="No Product Found"
          desc="We couldn't find any product matching your search criteria"
        />
      )}
    </>
  );
};

export default ProductList;

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {/* Product Image Skeleton */}
      <Skeleton className="aspect-square w-full" />

      <CardContent className="p-4 space-y-4">
        {/* Product Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* Price Skeleton */}
        <Skeleton className="h-8 w-24" />

        {/* Variant Options Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Size Availability Skeleton */}
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}
