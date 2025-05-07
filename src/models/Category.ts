import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
    },
    { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);