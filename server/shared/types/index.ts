import { zodUserSchemaType } from "../zod/user";
import { zodPostSchemaType } from "../zod/post";

export type UserType = Omit<zodUserSchemaType, "password"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PostType = zodPostSchemaType & {
  _id: string;
  likes: number;
  comments: number;
  userID: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  createdAt: string;
  updatedAt: string;
};
