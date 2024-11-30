import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import React, { useRef, useState } from "react";
import { IKUpload, IKImage, IKVideo } from "imagekitio-react";
import { ImageUp, Video } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/post";
import { useUserStore } from "../store/useUserStore";

type CreatePostFormType = {
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>;
};

export const formSchema = z.object({
  userId: z.string({ message: "User id is required" }),
  title: z.string({ message: "Title is required" }),
  content: z.string({ message: "Content is required" }),
  image_url: z.string().url({ message: "Invalid URL" }).optional(),
  image_url_fileId: z.string().optional(),
  video_url: z.string().url({ message: "Invalid URL" }).optional(),
  video_url_fileId: z.string().optional(),
});

const CratePostForm = ({ setOpenPost }: CreatePostFormType) => {
  const { user } = useUserStore();

  const ImageRef = useRef<any | null>(null);
  const videoRef = useRef<any | null>(null);

  const [imageFile, setImageFile] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user?._id || undefined,
      title: undefined,
      content: undefined,
      image_url: undefined,
      image_url_fileId: undefined,
      video_url: undefined,
      video_url_fileId: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => createPost(data),
    onSuccess: (data) => {
      console.log("Post created successfully", data);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["userByUserName", user?.userName],
      });
      setOpenPost(false);
    },
    onError: (error) => {
      console.log("Error creating post", error);
      toast.error(error.message || "Error creating post");
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form State Error", form.formState.errors);
    console.log("Form values", values);
    mutate(values);
  }

  // for image upload
  const imageOnSuccess = (res: any) => {
    console.log("Image upload success", res);
    setImageFile(res.url);
    form.setValue("image_url", res.url);
    form.setValue("image_url_fileId", res.fileId);
    toast.dismiss();
  };
  const imageOnError = (err: any) => {
    console.log("Image upload error", err);
    toast.error("Error uploading image to the cloud");
  };
  const imageOnUploadProgress = (progress: any) => {
    console.log("Image upload progress", progress);
    toast.loading("Uploading image to the cloud");
  };

  // for video upload
  const videoOnSuccess = (res: any) => {
    console.log("Video upload success", res);
    setVideoFile(res.url);
    form.setValue("video_url", res.url);
    form.setValue("video_url_fileId", res.fileId);
    toast.dismiss();
  };
  const videoOnError = (err: any) => {
    console.log("Video upload error", err);
    toast.error("Error uploading video to the cloud");
  };
  const videoOnUploadProgress = (progress: any) => {
    console.log("Video upload progress", progress);
    toast.loading("Uploading video to the cloud");
  };

  return (
    <div className={"w-full"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type={"text"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type={"text"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <ImageUp
              className={"size-fit"}
              onClick={() => {
                ImageRef?.current?.click();
              }}
            />
            <Video
              className={"size-fit"}
              onClick={() => {
                videoRef?.current?.click();
              }}
            />
          </div>
          <div className={"w-full h-auto"}>
            {imageFile && (
              <IKImage
                src={imageFile}
                alt={"image file"}
                loading={"lazy"}
                lqip={{ active: true }}
                className={"w-full h-[150px] lg:h-[250px] object-cover rounded"}
              />
            )}
            {videoFile && (
              <IKVideo
                src={videoFile}
                controls={true}
                className={"w-full h-[150px] lg:h-[250px] object-cover rounded"}
              />
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating post..." : "Create post"}
          </Button>
        </form>
      </Form>

      <IKUpload
        ref={ImageRef}
        onError={imageOnError}
        onSuccess={imageOnSuccess}
        onUploadProgress={imageOnUploadProgress}
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={(file) => file.size < 3000000}
        folder={"/x-clone/post/images"}
        style={{ display: "none" }}
      />

      <IKUpload
        ref={videoRef}
        onError={videoOnError}
        onSuccess={videoOnSuccess}
        onUploadProgress={videoOnUploadProgress}
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={(file) => file.size < 50000000}
        folder={"/x-clone/post/videos"}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CratePostForm;
