import ProductForm from "@/components/shared/ProductForm";
import useSetTitle from "@/hooks/useSetTitle";

const CreateProduct = () => {
  useSetTitle("Create a Product");

  return (
    <section className="py-8">
      <div className="container max-w-6xl w-full">
        <h2 className="mb-8  uppercase text-2xl text-center text-sky-700">
          Create Product
        </h2>
        <ProductForm className="space-y-8" type="create" />
      </div>
    </section>
  );
};

export default CreateProduct;
