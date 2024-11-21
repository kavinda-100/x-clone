import {zodUserSchemaType} from "../zod/user"

export type UserType = Omit<zodUserSchemaType, "password"> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}