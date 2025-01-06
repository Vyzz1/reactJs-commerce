import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Searchbar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (text.length < 3) {
      toast.error("Search text must be at least 3 characters long");
      return;
    }

    navigate(`/search?keyword=${text}`);
  };
  return (
    <div className=" w-full">
      <div className="flex  w-full">
        <div className="flex w-10 items-center border border-r-0 border-slate-950 dark:border-gray-100   justify-center rounded-tl-lg rounded-bl-lg   bg-transparent p-5">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="pointer-events-none absolute w-5 fill-gray-500 transition"
          >
            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
          </svg>
        </div>
        <div className="w-full flex outline-0 p-0 m-0 border border-r-0 border-slate-950 border-l-0 dark:border-gray-100">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className=" bg-transparent grow text-slate-950 dark:text-white  w-full pl-2 text-base leading-3 outline-0"
            placeholder="Search for a product"
            id=""
          />
        </div>

        <button
          onClick={handleOnClick}
          type="button"
          value="Search"
          className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
