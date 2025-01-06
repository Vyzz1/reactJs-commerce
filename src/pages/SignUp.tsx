import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { normalAxios } from "@/api/axios";
import { useState } from "react";
import UserForm from "@/components/shared/UserForm";
import useSetTitle from "@/hooks/useSetTitle";
import { useAuth } from "@/hooks/useAuth";
const SignUp = () => {
  useSetTitle("Sign Up");

  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await normalAxios.post("/auth/register", data);

      console.log(res);
      if (res.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-xl w-full mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm
              isRegister
              defaultValues={{}}
              onSubmit={handleSubmit}
              isPending={loading}
            />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignUp;
