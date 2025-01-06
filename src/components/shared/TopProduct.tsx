import useFetchData from "@/hooks/useFetchData";
import ProductList from "./ProductList";

const TopProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchData("/product/show-on-homepage", "", "normal");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section className="py-8 px-5 ">
      <h2 className="text-3xl uppercase font-inter bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-slate-400  mb-8 text-center">
        Reccommended For You
      </h2>
      <div className="max-w-6xl w-full mx-auto">
        <ProductList
          products={products}
          className="grid lg:grid-cols-4 gap-5   grid-cols-2  "
        />
      </div>
    </section>
  );
};

export default TopProduct;
