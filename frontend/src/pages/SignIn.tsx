import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodSignInSchema } from "@shared/zod/user";
import { Button } from "../components/ui/button";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInMethod } from "../api/auth";
import { useUserStore } from "../store/useUserStore";
import { toast } from "sonner";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodSignInSchema>) =>
      SignInMethod(data),
    onError: (error) => {
      console.log("error in sign in", error);
      toast.error(error.message || "Something went wrong");
    },
    onSuccess: (data) => {
      console.log("data in sign in", data);
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
      setUser(data?.data?.data);
      // localStorage.setItem("user", JSON.stringify(data?.data?.data));
      navigate("/");
    },
  });

  const form = useForm<z.infer<typeof zodSignInSchema>>({
    resolver: zodResolver(zodSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodSignInSchema>) {
    // console.log(values);
    mutate(values);
  }

  return (
    <main
      className={
        "w-full max-w-[1400px] mx-auto min-h-screen flex justify-center items-center"
      }
    >
      <Card className={"max-w-[400px] w-full"}>
        <CardHeader>
          <CardTitle className={"text-center text-xl"}>Sign In 🔑</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eample@gmail.com"
                        type={"email"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div
                        className={"relative flex justify-start items-center"}
                      >
                        <Input
                          className={" w-full"}
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <div className={"absolute z-10 right-4"}>
                          {showPassword ? (
                            <Eye
                              className={"w-4 h-4 cursor-pointer"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ) : (
                            <EyeOff
                              className={"w-4 h-4 cursor-pointer"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"flex-col justify-end items-end gap-3"}>
          <p className={"text-sm"}>
            Don't have an account?
            <Link
              className={"text-sm font-semibold hover:underline mx-2"}
              to={"/sign-up"}
            >
              Sign Up
            </Link>
          </p>
          <Link
            className={"text-sm font-semibold hover:underline"}
            to={"/forgot-password"}
          >
            Reset Password
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignIn;
