import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodSignInSchema } from "@shared/zod/user";

const SignIn = () => {
  const form = useForm<z.infer<typeof zodSignInSchema>>({
    resolver: zodResolver(zodSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodSignInSchema>) {
    console.log(values);
  }

  return (
    <section className={"w-full h-screen flex justify-center items-center"}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In 🔑</CardTitle>
        </CardHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <CardFooter className={"flex-col justify-end items-end gap-3"}>
          <p>
            Don't have an account?
            <Link
              className={"text-md font-semibold hover:underline mx-2"}
              to={"/sign-up"}
            >
              Sign Up
            </Link>
          </p>
          <Link
            className={"text-md font-semibold hover:underline"}
            to={"/forgot-password"}
          >
            Reset Password
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignIn;
