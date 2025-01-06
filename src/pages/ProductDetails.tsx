import AddToCart from "@/components/shared/AddToCart";
import FindRandom from "@/components/shared/FindRandom";
import ProductPhotosAlbum from "@/components/shared/ProductPhotosAlbum";
import QuantityInput from "@/components/shared/QuantityInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { productDetailsAdvertisement } from "@/data";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";
import DOMPurify from "dompurify";
import useSetTitle from "@/hooks/useSetTitle";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useFetchData(`/product/${id}`, "", "normal");
  const [productItem, setProductItem] = useState(null);
  const [size, setSize] = useState(null);

  const [currentInStock, setCurrentInStock] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      setProductItem(product.productItems);

      setSize(product?.sizes[0]);
    }
  }, [isSuccess, product]);

  useSetTitle(product?.name);

  // matching in stock with color and size
  useEffect(() => {
    if (size && isSuccess && product) {
      const matchingInStock = product.productItems
        .map((item: any) => {
          const foundSize = item.productSize.value === size;

          if (foundSize) {
            return item;
          }
          return null;
        })
        .find((i: any) => i !== null);

      setProductItem(matchingInStock);

      setCurrentInStock(matchingInStock?.quantity);
    }
  }, [isSuccess, product, size]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    isSuccess && (
      <section className="py-8">
        <div className="max-w-7xl px-3  mx-auto">
          <div className="w-max mr-auto mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link to={"/"}>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{product.category.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-28">
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex sm:flex-nowrap flex-wrap gap-y-3  gap-x-10">
            <div className="sm:w-1/2 w-full space-y-8">
              <img
                src={product.avatar}
                loading="lazy"
                alt={product.name}
                className="w-full aspect-auto object-cover rounded-sm"
              />
              <ProductPhotosAlbum images={product.images ?? []} />
            </div>
            <div className="flex w-full sm:w-1/2 flex-col gap-y-8 items-center sm:items-start ">
              <h2 className="text-4xl tracking-wide font-inter text-slate-800 text-start font-bold dark:text-gray-100">
                {product.name}
              </h2>
              <p className="text-center tracking-wider font-light text-sky-600 text-[25px]">
                {product.price}$
              </p>
              <p>
                Condition :{" "}
                <span className="text-sky-500">
                  {currentInStock > 0
                    ? `${currentInStock} available`
                    : "Out of stock"}
                </span>
              </p>
              <ToggleGroup
                value={product.colorName}
                onValueChange={(value) => {
                  if (value !== "") return;
                }}
                variant="outline"
                type="single"
              >
                <ToggleGroupItem
                  className="border-sky-300 !h-min py-2  font-normal text-base"
                  value={product.colorName}
                >
                  <div className="space-y-2 flex flex-col justify-center items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-sky-500`}
                      style={{ backgroundColor: product.colorName }}
                    ></div>

                    <p>{product.colorName}</p>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>

              {product?.sizes?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-slate-950 text-base">Size : </p>
                  <ToggleGroup
                    onValueChange={(value) => {
                      if (value !== "") {
                        setSize(value);
                      }
                    }}
                    variant="outline"
                    value={size}
                    type="single"
                  >
                    {product.sizes
                      .sort((a, b) => a - b)
                      .map((size: string) => (
                        <ToggleGroupItem
                          key={size}
                          className="border-sky-300 font-normal text-base  
                      data-[state=on]:bg-sky-100 dark:data-[state=on]:bg-slate-50/40                      "
                          value={size}
                        >
                          {size}
                        </ToggleGroupItem>
                      ))}
                  </ToggleGroup>
                </div>
              )}
              <div className="flex items-center">
                <QuantityInput
                  quantity={selectedQuantity}
                  setQuantity={setSelectedQuantity}
                  max={currentInStock}
                />
              </div>
              <div className="flex items-center gap-x-2 ">
                <AddToCart
                  quantity={selectedQuantity}
                  productItemId={productItem?.id}
                />
              </div>
              <div className="flex flex-col   divide-y ">
                {productDetailsAdvertisement.map((item) => (
                  <div
                    className="flex gap-x-2 p-3 items-center"
                    key={item.title}
                  >
                    {item.icon}
                    <p className="text-base lg:text-xl tracking-wide font-beViet text-gray-500 dark:text-gray-100">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto w-full my-5">
            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="desc">
                <AccordionTrigger>
                  <h2 className="text-xl text-muted-foreground ">
                    Desccription
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description),
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <FindRandom productId={parseInt(id)} />
        </div>
      </section>
    )
  );
};

export default ProductDetails;
