import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodUserSchema } from "@shared/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpMethod } from "../api/auth";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodUserSchema>) =>
      SignUpMethod(data),
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

  const form = useForm<z.infer<typeof zodUserSchema>>({
    resolver: zodResolver(zodUserSchema),
    defaultValues: {
      name: "",
      email: "",
      userName: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodUserSchema>) {
    // console.log(values);
    mutate(values);
  }

  return (
    <main
      className={
        "w-full max-w-[1400px] mx-auto min-h-screen flex justify-center items-center"
      }
    >
      <Card className={"min-w-[200px] max-w-[400px] w-full"}>
        <CardHeader>
          <CardTitle className={"text-center text-xl"}>Sign Up 🔑</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="jone" type={"text"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="jone doe" type={"text"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jonedoe@gmail.com"
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
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <div></div>
        <CardFooter className={"flex-col justify-end items-end gap-3"}>
          <p className={"text-sm text-foreground"}>
            All ready have an account?
            <Link
              className={"text-sm font-semibold hover:underline mx-2"}
              to={"/sign-in"}
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignUp;
