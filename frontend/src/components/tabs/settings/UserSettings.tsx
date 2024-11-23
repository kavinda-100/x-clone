import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../../../store/useUserStore";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { zodUserSchemaForFrontEnd } from "../../../zod/user";

const UserSettings = () => {
  const { user } = useUserStore();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof zodUserSchemaForFrontEnd>>({
    resolver: zodResolver(zodUserSchemaForFrontEnd),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      userName: user?.userName || "",
      password: "",
      bio: user?.bio || "",
      location: user?.location || "",
      socialLinks: user?.socialLinks || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  function onSubmit(values: z.infer<typeof zodUserSchemaForFrontEnd>) {
    console.log(values);
  }

  return (
    <div className={"w-full p-3 h-auto"}>
      <h1 className={"text-center font-semibold my-2"}>Your Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="jhon" type={"text"} {...field} />
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="jhon doe" type={"text"} {...field} />
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
                    placeholder="example@gmail.com"
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
                  <div className={"relative flex justify-start items-center"}>
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
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="About you" type={"text"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* for social links */}
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`socialLinks.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Link Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Social Link Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Link URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Social Link URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size={"sm"}
                variant={"secondary"}
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div>
            <Button
              type="button"
              size={"sm"}
              variant={"secondary"}
              onClick={() => append({ name: "", url: "" })}
            >
              Add Social Link
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserSettings;
