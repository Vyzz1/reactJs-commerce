import ProductForm from "@/components/shared/ProductForm";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchData";
import useSetTitle from "@/hooks/useSetTitle";
import { ProductFormType } from "@/zod";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useFetchData(`/product/${id}`, "", "private");
  useSetTitle(product?.name);

  const [defaultValues, setDefaultValues] =
    React.useState<ProductFormType>(null);

  const [images, setImages] = React.useState<string[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setDefaultValues({
        ...product,
        categoryId: product.categoryId.toString(),
        brandId: product.brandId.toString(),
        productColorId: product.productColorId.toString(),
      });
      setImages(product.images);
    }
  }, [product, isSuccess]);

  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    isSuccess && (
      <section className="py-8">
        <div className="container  max-w-6xl w-full">
          <h2 className="mb-8  uppercase text-2xl text-center text-sky-700">
            Update Product
          </h2>
          <div className="w-full py-8 mr-auto">
            <Button
              onClick={() => navigate(`/admin/product/${id}/config`)}
              size="sm"
              variant="secondary"
            >
              Edit Product Item Here
            </Button>
          </div>

          <div className="grid grid-cols-10 gap-2">
            {defaultValues && (
              <ProductForm
                images={images}
                setImages={setImages}
                className="space-y-8 col-span-10 lg:col-span-7 "
                id={parseInt(id)}
                defaultValues={defaultValues}
                type="update"
              />
            )}

            <div className="lg:col-span-3 col-span-10  w-full">
              <p className="text-center">
                <strong>Images</strong>
              </p>
              <div className="flex flex-wrap items-center py-5 gap-5">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt="product"
                      className=" aspect-square size-32   object-cover"
                    />
                    <div
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute top-[0.4px] -right-[0.2px] border rounded-full size-5 flex justify-center items-center border-slate-700  bg-black/50 brightness-125"
                    >
                      <span className="text-red-500 cursor-pointer text-xs">
                        X
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center">
                <strong>Avatar</strong>
              </p>
              <div className=" flex justify-center relative mt-5">
                <img
                  src={defaultValues?.avatar as string}
                  alt="product"
                  className="size-60 aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default UpdateProduct;
