import * as mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    // token expiration time is 1 hour
    token_createdAt: { type: Date, default: Date.now, expires: 3600 }
}, { timestamps: true });

const VerificationModel = mongoose.model("Verification", VerificationSchema);

export default VerificationModel;