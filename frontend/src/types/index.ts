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
