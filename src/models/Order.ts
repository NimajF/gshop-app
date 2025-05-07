import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
            },
        ],
        total: Number,
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentMethod: { type: String },
        shippingAddress: { type: String },
    },
    { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);