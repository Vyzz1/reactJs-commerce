import useFetchData from "@/hooks/useFetchData";
import ProductList from "./ProductList";

type FindRandomProps = {
  productId: string;
};

const FindRandom = ({ productId }: FindRandomProps) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchData(`product/random/${productId}`, "", "normal");
  if (isError) return <div>Error</div>;
  return (
    <div className="max-w-6xl mt-12 mx-auto w-full">
      <h3 className="bg-gradient-to-r text-3xl text-start  from-gray-500 font-normal to-blue-300 bg-clip-text text-transparent">
        Relevant Products
      </h3>
      <ProductList
        products={products}
        isLoading={isLoading}
        className="mt-5 grid sm:grid-cols-4 grid-cols-1  gap-5 "
      />
    </div>
  );
};

export default FindRandom;
