import { normalAxios } from "@/api/axios";
import RenderFormField from "@/components/shared/RenderFormField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import ForgotPasswordContext, {
  ForgotPasswordProvider,
} from "@/context/ForgotPasswordContext";
import useSetTitle from "@/hooks/useSetTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type ForgotPasswordProps = {
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const InputEmail = ({ setProgress }: ForgotPasswordProps) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { setToken, loading, setLoading } = useContext(ForgotPasswordContext);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const res = await normalAxios.post("/password/forgot", data);
      if (res) {
        setToken(res.data.token);
        setProgress(66);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center space-y-2">
        <h4 className="text-black text-2xl dark:text-white ">
          Input Email Your Email
        </h4>
        <blockquote className="text-muted-foreground tracking-wide   text-sm">
          You are in the step 1 of 3
        </blockquote>
      </div>
      <Form {...form}>
        <form
          className="space-y-8 max-w-lg w-full  mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <RenderFormField
            control={form.control}
            name="email"
            inputType="email"
            title="Email"
            type="input"
          />
          <FormDescription className="block border-l-2 border-gray-600 pl-3">
            We will send you an OTP to reset your password
          </FormDescription>
          <Button size="sm" type="submit" disabled={loading}>
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  );
};

const TypeOTP = ({ setProgress }: ForgotPasswordProps) => {
  const formSchema = z.object({
    otp: z.string().length(6),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { token, setToken, loading, setLoading } = useContext(
    ForgotPasswordContext
  );

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const res = await normalAxios.post("/password/validate", {
        ...data,
        token: token,
      });
      if (res) {
        setToken(res.data.token);
        setProgress(100);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-4 py-2">
      <div className="mb-3 text-center space-y-2">
        <h4 className="text-black text-2xl dark:text-white ">
          Enter Your OTP From Mail
        </h4>
        <blockquote className="text-muted-foreground  pl-3 text-sm">
          You are in the step 2 of 3
        </blockquote>
      </div>
      <div className="w-full flex items-center  justify-center">
        <Form {...form}>
          <form className="space-y-8 " onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center w-full">
              <Button type="submit" disabled={loading}>
                Verify OTP
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const ChangePasword = ({ setProgress }: ForgotPasswordProps) => {
  const formSchema = z
    .object({
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { token, setToken, loading, setLoading } = useContext(
    ForgotPasswordContext
  );
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const res = await normalAxios.post("/password/reset", {
        ...data,
        token: token,
      });
      if (res) {
        setToken(null);
        setProgress(169);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3 text-center space-y-2">
        <h4 className="text-black text-2xl dark:text-white">
          Change Your New Password
        </h4>
        <blockquote className="text-muted-foreground  pl-3 text-sm">
          You are in the step 3 of 3
        </blockquote>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-lg   mx-auto"
        >
          <RenderFormField
            control={form.control}
            name="password"
            inputType="password"
            title="Password"
            type="input"
          />
          <RenderFormField
            control={form.control}
            name="confirmPassword"
            inputType="password"
            title="Confirm Password"
            type="input"
          />
          <Button type="submit" disabled={loading}>
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

const SucccessPage = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">
            Change Password Successfully !
          </h3>
          <p className="text-gray-600 my-2">Please login to continue.</p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              to={"/login"}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [progress, setProgress] = useState(33);

  useSetTitle("Forgot Password");

  return (
    <section className="px-4 py-8">
      <h2 className="font-bold  text-slate-950 text-4xl mb-12 text-center tracking-wide">
        {" "}
        Forgot Your Password ?{" "}
      </h2>
      <div className="max-w-7xl w-full mx-auto ">
        <ForgotPasswordProvider>
          <Progress value={progress} />
          <div className="px-4 py-12 w-full shadow-sm ">
            {progress === 33 && <InputEmail setProgress={setProgress} />}
            {progress === 66 && <TypeOTP setProgress={setProgress} />}
            {progress === 100 && <ChangePasword setProgress={setProgress} />}
            {progress === 169 && <SucccessPage />}
          </div>
        </ForgotPasswordProvider>
      </div>
    </section>
  );
};

export default ForgotPassword;
