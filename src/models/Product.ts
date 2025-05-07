import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        images: [{ type: String }],
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        featured: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);