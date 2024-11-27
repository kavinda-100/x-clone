export type PostType = {
  _id: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  likes: number;
  comments: number;
  createdAt: string;
  userId: {
    _id: string;
    userName: string;
    profileImage: string;
  };
};

export type commentType = {
  _id: string;
  comment: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  userId: {
    _id: string;
    userName: string;
    profileImage: string;
  };
};

export type ImagesUploadType = {
  ImageUrl: string;
  ImageFileId: string;
};

export type FollowerUserType = {
  _id: string;
  follower_user_id: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  following_user_id: string;
  createdAt: string;
  updatedAt: string;
};

export type FollowingUserType = {
  _id: string;
  follower_user_id: string;
  following_user_id: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  createdAt: string;
  updatedAt: string;
};

type PostDetailsType = {
  _id: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  userId: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
};

export type SelectedUserPostType = {
  _id: string;
  postId: PostDetailsType;
  userId: string;
};
