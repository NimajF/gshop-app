import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import { slugify } from "@/scripts/slugify";

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();
    const { name, description, price, category, stock, images, published } =
      data;
    // console.log(images, "images");

    const newProduct = new Product({
      name,
      slug: name,
      description,
      price,
      category,
      stock,
      images,
      published,
    });

    await newProduct.save();
    const finalSlug = slugify(`${name}-${newProduct._id.toString().slice(-4)}`);
    newProduct.slug = finalSlug;
    await newProduct.save();

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error creando producto",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
