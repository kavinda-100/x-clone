import * as mongoose from "mongoose";

import { zodUserSchemaType} from "../../shared/zod/user";

const userModel = new mongoose.Schema<zodUserSchemaType>({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false,
        default: ""
    },
    coverImage: {
        type: String,
        required: false,
        default: ""
    },
    bio: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    socialLinks: {
        type: Array,
        required: false,
        default: []
    },
    isEmailVerified: {
        type: Boolean,
        required: false,
        default: false
    }
}, {timestamps: true});

const UserModel = mongoose.model<zodUserSchemaType>("User", userModel);

export default UserModel;