import useFetchData from "@/hooks/useFetchData";
import React from "react";
import ProductList from "./ProductList";

type FindRandomProps = {
  productId: number;
};

const FindRandom = ({ productId }: FindRandomProps) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchData(`product/random?id=${productId}`, "", "normal");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="max-w-5xl mt-12 mx-auto w-full">
      <h3 className="bg-gradient-to-r text-3xl text-start  from-gray-500 font-normal to-blue-300 bg-clip-text text-transparent">
        Relevant Products
      </h3>
      <ProductList
        products={products}
        className="mt-5 grid sm:grid-cols-4 grid-cols-2 gap-5 "
      />
    </div>
  );
};

export default FindRandom;
