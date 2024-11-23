type UserBannerProps = {
  profileImage: string;
  coverImage: string;
};

const UserBanner = ({ profileImage, coverImage }: UserBannerProps) => {
  return (
    <div className={"w-full h-[200px] lg:h-[350px]"}>
      <div className={"relative"}>
        <img
          src={coverImage}
          alt={"userName"}
          className={"w-full h-[150px] lg:h-[250px] object-cover rounded"}
        />
        <img
          src={profileImage}
          alt={"userName"}
          className={
            "w-20 h-20 lg:w-40 lg:h-40 rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          }
        />
      </div>
    </div>
  );
};

export default UserBanner;
