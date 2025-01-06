import BoxReveal from "../ui/BoxReveal";
import Searchbar from "./Searchbar";
import GridPattern from "../ui/GridPattern";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { heroIcons } from "@/data";

const Hero = () => {
  return (
    <section className="py-8  ">
      <div className="max-w-7xl relative z-30 overflow-hidden mx-auto p-8 flex items-center gap-x-3    text-white text-center rounded-xl  ">
        <div className="space-y-8 lg:w-1/2 w-full lg:block flex flex-col items-center justify-center">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Shop Now</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-4xl py-2 text-center bg-clip-text bg-gradient-to-b from-slate-400 to-blue-600 text-transparent lg:text-6xl font-semibold">
              SpringCommerce
            </p>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-[.5rem] text-lg italic text-slate-950 dark:text-white">
              E-commerce website with
              <span className="text-[#5046e6]"> Minimum Viable Product</span>
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5} width="100%">
            <Searchbar />
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="flex w-full gap-8 items-center flex-wrap  justify-center">
              {heroIcons.map((ic) => (
                <div key={ic.title} className="space-x-2 flex items-center">
                  {ic.icon}
                  <span className="text-neutral-500 text-base font-beViet ">
                    {ic.title}
                  </span>
                </div>
              ))}
            </div>
          </BoxReveal>
        </div>

        {/* Replace this */}
        <div className="w-1/2 z-30 hidden lg:block">
          {/* <img
            className="z-30 object-cover w-full h-full rounded-xl"
            src={bgImage}
          /> */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Best Price Guaranteed
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Providing the best price for all products
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://www.marketing91.com/wp-content/uploads/2020/06/Nike-advertising.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  href="/products"
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-base font-normal bg-clip-text  bg-gradient-to-r from-neutral-400 to-indigo-500 text-transparent dark:text-white"
                >
                  Try now →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
        <GridPattern className="!z-[5] absolute" />
      </div>
    </section>
  );
};

export default Hero;
