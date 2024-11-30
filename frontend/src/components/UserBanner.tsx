import { IKUpload, IKImage } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "sonner";
import { CalendarDays, CloudUpload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCoverImage, sendProfileImage } from "../api/users";
import { ImagesUploadType } from "../types";
import { capitalizeFirstLetter, formatJoinDate } from "../lib/utils";

type UserBannerProps = {
  profileImage: string;
  coverImage: string;
  isSettingsPage: boolean;
  userName?: string;
  email?: string;
  bio?: string;
  createdAt?: string;
  totalFollowers?: number;
  totalFollowing?: number;
  totalLikes?: number;
};

const UserBanner = ({
  profileImage,
  coverImage,
  isSettingsPage,
  userName,
  email,
  bio,
  createdAt,
  totalFollowers,
  totalFollowing,
  totalLikes,
}: UserBannerProps) => {
  const profileImageRef = useRef<any | null>(null);
  const coverImageRef = useRef<any | null>(null);

  const queryClient = useQueryClient();

  // for profile image
  const { mutate: profileMutate } = useMutation({
    mutationFn: async ({ ImageUrl, ImageFileId }: ImagesUploadType) =>
      sendProfileImage({ ImageUrl, ImageFileId }),
    onSuccess: (data) => {
      console.log("Profile image", data);
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
    mutationFn: async ({ ImageUrl, ImageFileId }: ImagesUploadType) =>
      sendCoverImage({ ImageUrl, ImageFileId }),
    onSuccess: (coverData) => {
      console.log("Cover image", coverData);
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
    profileMutate({ ImageUrl: res.url, ImageFileId: res.fileId });
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
    coverMutate({ ImageUrl: res.url, ImageFileId: res.fileId });
  };

  const coverOnUploadProgress = (progress: ProgressEvent) => {
    console.log("Cover image Progress", progress);
    toast.loading("Uploading cover image to the cloud");
  };

  return (
    <>
      <div className={"w-full h-[200px] lg:h-[350px]"}>
        <div className={"relative"}>
          {/* for cover image */}
          <IKImage
            src={coverImage}
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
              src={profileImage}
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
            folder={"/x-clone/user/profile"}
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
            folder={"/x-clone/user/profile"}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {/* other */}
      <div className={"w-full"}>
        <h1 className={"text-md lg:text-lg font-bold text-muted-foreground"}>
          {capitalizeFirstLetter(userName || "") || ""}
        </h1>
        <p className={"text-sm text-muted-foreground"}>{email || ""}</p>
        <p className={"text-sm font-semibold text-muted-foreground mt-2"}>
          {bio || "No bio"}
        </p>
        <div className={"mt-2 w-full"}>
          <div className={"flex gap-3 justify-start items-center"}>
            <CalendarDays className={"size-5"} />
            <p className={"text-sm text-muted-foreground"}>
              {formatJoinDate(createdAt || "") || ""}
            </p>
          </div>
        </div>
        <div className={"flex justify-start items-center gap-3 mt-3"}>
          <p className={"text-sm text-muted-foreground"}>
            <span className={"font-semibold text-foreground"}>
              {totalFollowers || 0}
            </span>{" "}
            Followers
          </p>
          <p className={"text-sm text-muted-foreground"}>
            <span className={"font-semibold text-foreground"}>
              {totalFollowing || 0}
            </span>{" "}
            Followings
          </p>
          <p className={"text-sm text-muted-foreground"}>
            <span className={"font-semibold text-foreground"}>
              {totalLikes || 0}
            </span>{" "}
            Likes
          </p>
        </div>
      </div>
    </>
  );
};

export default UserBanner;
