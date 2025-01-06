import Categories from "@/components/shared/Categories";
import Hero from "@/components/shared/Hero";
import TopProduct from "@/components/shared/TopProduct";
import useSetTitle from "@/hooks/useSetTitle";
const Home = () => {
  useSetTitle("Spring Commerce");
  return (
    <>
      <Hero />
      <Categories />
      <TopProduct />
    </>
  );
};

export default Home;
