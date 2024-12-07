import ImageKit from "imagekit";
import { toast } from "sonner";

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_IMAGEKITIO_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKITIO_URL_ENDPOINT,
});

export const deleteImage = (fileId: string) => {
  imagekit.deleteFile(fileId, function (error, result) {
    if (error) {
      console.log(error);
      toast.error("Error deleting image from the bucket/cloud");
      toast.dismiss();
    }
    console.log(result);
    toast.success("Image deleted successfully");
    toast.dismiss();
  });
};
