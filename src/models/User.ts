import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

export default models.User || model("User", UserSchema);