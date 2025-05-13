import { NextResponse } from "next/server";
import Product from "@/models/Product";
import "@/models/Category";
import connectDB from "@/lib/db";

export async function GET(req: Request, context: { params: { slug: string } }) {
  await connectDB();

  try {
    const { slug } = context.params;

    const product = await Product.findOne({ slug }).populate(
      "category",
      "name slug"
    );

    if (!product) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Error obteniendo producto" },
      { status: 500 }
    );
  }
}
