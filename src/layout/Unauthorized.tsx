import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-8 font-inter text-3xl text-red-400 text-center">
        401 Unauthorized
      </h1>
      <h2 className="py-8 font-inter text-3xl text-red-400 text-center">
        You are not allowed to access this page
      </h2>
      <Button
        size="lg"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back{" "}
      </Button>
    </div>
  );
};

export default Unauthorized;
