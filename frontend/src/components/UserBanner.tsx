import { IKUpload, IKImage } from "imagekitio-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CloudUpload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCoverImage, sendProfileImage } from "../api/users";

type UserBannerProps = {
  profileImage: string;
  coverImage: string;
  isSettingsPage: boolean;
};

const UserBanner = ({
  profileImage,
  coverImage,
  isSettingsPage,
}: UserBannerProps) => {
  const profileImageRef = useRef<any | null>(null);
  const coverImageRef = useRef<any | null>(null);

  const [profileImageFile, setProfileImageFile] = useState<string | undefined>(
    "",
  );
  const [coverImageFile, setCoverImageFile] = useState<string | undefined>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    setProfileImageFile(profileImage);
    setCoverImageFile(coverImage);
  }, [profileImage, coverImage]);

  // for profile image
  const { mutate: profileMutate } = useMutation({
    mutationFn: async (profileImageFile: string) =>
      sendProfileImage(profileImageFile),
    onSuccess: () => {
      toast.success("Profile Image uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
      toast.dismiss();
    },
    onError: (error) => {
      console.log("Error in profile image", error);
      toast.error("Error uploading profile image to the server");
      toast.dismiss();
    },
  });

  // for cover image
  const { mutate: coverMutate } = useMutation({
    mutationFn: async (coverImageFile: string) =>
      sendCoverImage(coverImageFile),
    onSuccess: () => {
      toast.success("Cover Image uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
      toast.dismiss();
    },
    onError: (error) => {
      console.log("Error in cover image", error);
      toast.error("Error uploading cover image to the server");
      toast.dismiss();
    },
  });

  const ProfileOnError = (err: Error | any) => {
    console.log("Error", err);
    toast.error("Error uploading profile image to the bucket/cloud");
  };

  const profileOnSuccess = (res: any) => {
    console.log("Success", res);
    setProfileImageFile(res.url);
    profileMutate(res.url);
  };

  const profileOnUploadProgress = (progress: ProgressEvent) => {
    console.log("profile image Progress", progress);
    toast.loading("Uploading profile image to the cloud");
  };

  const CoverOnError = (err: Error | any) => {
    console.log("Error", err);
    toast.error("Error uploading cover image to the bucket/cloud");
  };

  const coverOnSuccess = (res: any) => {
    console.log("Success", res);
    setCoverImageFile(res.url);
    coverMutate(res.url);
  };

  const coverOnUploadProgress = (progress: ProgressEvent) => {
    console.log("Cover image Progress", progress);
    toast.loading("Uploading cover image to the cloud");
  };

  return (
    <div className={"w-full h-[200px] lg:h-[350px]"}>
      <div className={"relative"}>
        {/* for cover image */}
        <IKImage
          src={coverImageFile || ""}
          alt={"userName"}
          loading={"lazy"}
          lqip={{ active: true }}
          className={"w-full h-[150px] lg:h-[250px] object-cover rounded"}
        />
        {isSettingsPage && (
          <div
            className={
              "absolute bottom-0 right-0 bg-gray-900 p-1 lg:p-3 rounded-full"
            }
          >
            <CloudUpload
              className={"size-4 lg:size-8"}
              onClick={() => {
                coverImageRef.current?.click();
              }}
            />
          </div>
        )}

        {/* for profile image */}
        <div
          className={
            "w-20 h-20 lg:w-40 lg:h-40 rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          }
        >
          <IKImage
            src={profileImageFile || ""}
            alt={"userName"}
            loading={"lazy"}
            lqip={{ active: true }}
            className={"w-full h-full object-cover rounded-full"}
          />
          {isSettingsPage && (
            <div
              className={
                "absolute bottom-0 right-0 bg-gray-900 p-1 lg:p-2 rounded-full"
              }
            >
              <CloudUpload
                className={"size-4 lg:size-8"}
                onClick={() => {
                  profileImageRef.current?.click();
                }}
              />
            </div>
          )}
        </div>

        <IKUpload
          ref={profileImageRef}
          onError={ProfileOnError}
          onSuccess={profileOnSuccess}
          onUploadProgress={profileOnUploadProgress}
          isPrivateFile={false}
          useUniqueFileName={true}
          validateFile={(file) => file.size < 3000000}
          folder={"/user/profile"}
          style={{ display: "none" }}
        />

        <IKUpload
          ref={coverImageRef}
          onError={CoverOnError}
          onSuccess={coverOnSuccess}
          onUploadProgress={coverOnUploadProgress}
          isPrivateFile={false}
          useUniqueFileName={true}
          validateFile={(file) => file.size < 3000000}
          folder={"/user/profile"}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default UserBanner;
