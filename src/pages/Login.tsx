import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RenderFormField from "@/components/shared/RenderFormField";
import { toast } from "sonner";
import axios from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";
import useSetTitle from "@/hooks/useSetTitle";
import React from "react";
import { FaSpinner } from "react-icons/fa";
const Login = () => {
  useSetTitle("Login");
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });
  type LoginType = z.infer<typeof loginSchema>;
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { updateCurrentUser, setAuth, currentUser } = useAuth();

  const [loading, setLoading] = React.useState(false);

  if (currentUser) {
    // navigate(-1);
    return <Navigate to={"/"} replace />;
  }

  const handleSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", data);

      if (res) {
        const { _id, token, name, role, photoURL } = res.data;

        console.log(photoURL);

        updateCurrentUser({
          photoUrl: photoURL,
          name: name,
          _id,
          role,
        });

        setAuth({
          accessToken: token,
        });

        navigate(from, { replace: true });
        toast.success("Login successful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-8 px-4 ">
      <div className="max-w-lg w-full mx-auto ">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form */}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <RenderFormField
                    name="email"
                    title="Email"
                    type="input"
                    inputType="email"
                    placeholder="vy@gmail.com"
                    control={form.control}
                  />
                </div>
                <div className="grid gap-2">
                  <RenderFormField
                    name="password"
                    title="Password"
                    type="input"
                    inputType="password"
                    control={form.control}
                  />
                </div>
                <div className="flex items-center">
                  <Link
                    to="/forgot"
                    className="ml-auto hover:text-sky-400 inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
            {/* End form */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline hover:text-sky-400">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Login;
