import useFetchData from "@/hooks/useFetchData";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useFetchData("/category/all", "", "normal");
  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("Something went wrong");

  return (
    <section className="py-8 ">
      <h2 className="text-3xl uppercase font-inter bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-neutral-400  mb-8 text-center">
        Browse By Categories
      </h2>
      <div className="max-w-6xl flex gap-5  justify-center items-center flex-wrap w-full mx-auto">
        {categories.map((category: any) => (
          <Card
            key={category.id}
            onClick={() => navigate(`/search?category=${category.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-center text-xl text-gray-700 dark:text-white">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={category.image}
                alt={category.name}
                className="w-full cursor-pointer h-52 object-cover aspect-square rounded-sm "
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Categories;
