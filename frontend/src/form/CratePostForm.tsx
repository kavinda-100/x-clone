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
import { useRef, useState } from "react";
import { IKUpload, IKImage, IKVideo } from "imagekitio-react";
import { ImageUp, Video } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string({ message: "Title is required" }),
  content: z.string({ message: "Content is required" }),
  image_url: z.string().url({ message: "Invalid URL" }),
  image_url_fileId: z.string(),
  video_url: z.string().url({ message: "Invalid URL" }),
  video_url_fileId: z.string(),
});

const CratePostForm = () => {
  const ImageRef = useRef<any | null>(null);
  const videoRef = useRef<any | null>(null);

  const [imageFile, setImageFile] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
    toast.dismiss();
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
    toast.dismiss();
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
                ImageRef.current?.click();
              }}
            />
            <Video
              className={"size-fit"}
              onClick={() => {
                videoRef.current?.click();
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
          <Button type="submit">Create</Button>
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
        folder={"/post/images"}
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
        folder={"/post/videos"}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CratePostForm;
