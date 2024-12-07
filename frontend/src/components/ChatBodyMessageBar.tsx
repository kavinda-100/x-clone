import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image, X } from "lucide-react";
import { zodMessageSchema } from "@shared/zod/messages";
import { useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useChatStore } from "../store/useChatStore";
import { IKUpload } from "imagekitio-react";
import { toast } from "sonner";
import { deleteImage } from "../lib/ImageKit";

const ChatBodyMessageBar = () => {
  const { user } = useUserStore();
  const { selectedUser } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState("");
  const [imageFileId, setImageFileId] = useState("");
  const [formState, setFormState] = useState<z.infer<typeof zodMessageSchema>>({
    message: "",
    image_url: "",
    image_url_fileId: "",
    sender_id: "",
    receiver_id: "",
  });
  const imageRef = useRef<any | null>(null);

  function onSubmit() {
    setFormState({
      message: newMessage,
      image_url: image,
      image_url_fileId: imageFileId,
      sender_id: user?._id!,
      receiver_id: selectedUser?._id!,
    });
    console.log(formState);
  }

  const CancelImage = () => {
    if (imageFileId) {
      deleteImage(imageFileId);
      setImage("");
    }
  };

  const ImageOnError = (err: Error | any) => {
    console.log("Error", err);
    toast.error("Error uploading image to the bucket/cloud");
    toast.dismiss();
  };

  const ImageOnSuccess = (res: any) => {
    console.log("Success", res);
    setImage(res.url);
    setImageFileId(res.fileId);
    toast.success("Image uploaded successfully");
    toast.dismiss();
  };

  const ImageOnUploadProgress = (progress: ProgressEvent) => {
    console.log("image Progress", progress);
    toast.loading("Uploading image to the cloud");
  };

  return (
    <>
      <div className={"w-full flex gap-2 relative"}>
        {/* image preview */}
        {image && (
          <div className="absolute bottom-9 left-32 w-full flex justify-center">
            <div className="relative p-2 border shadow-md rounded">
              <img
                src={image}
                alt="Preview"
                className="w-50 h-32 object-cover rounded"
              />
              <Button
                variant={"outline"}
                type={"button"}
                className="absolute top-2 right-2 size-5"
                onClick={CancelImage}
              >
                <X />
              </Button>
            </div>
          </div>
        )}

        <Input
          placeholder="type here..."
          onChange={(e) => setNewMessage(e.target.value)}
          className={"relative w-full"}
        />
        <Button
          variant={"ghost"}
          type={"button"}
          onClick={() => imageRef?.current?.click()}
        >
          <Image />
        </Button>
        <Button
          variant={"ghost"}
          type={"submit"}
          disabled={!newMessage || newMessage.length === 0}
          onClick={onSubmit}
        >
          <Send />
        </Button>

        {/* image uploader */}
        <IKUpload
          ref={imageRef}
          onError={ImageOnError}
          onSuccess={ImageOnSuccess}
          onUploadProgress={ImageOnUploadProgress}
          isPrivateFile={false}
          useUniqueFileName={true}
          validateFile={(file) => file.size < 3000000}
          folder={"/x-clone/messages"}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default ChatBodyMessageBar;
