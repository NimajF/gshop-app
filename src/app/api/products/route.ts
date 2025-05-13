import { NextResponse } from "next/server";
import Category from "@/models/Category";
import Product from "@/models/Product";
import mongoose from "mongoose";
import connectDB from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: { category: string } }
) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let query: any = {};

  if (category) {
    if (mongoose.Types.ObjectId.isValid(category)) {
      query.category = category;
    } else {
      const found = await Category.findOne({ slug: category });
      if (found) {
        query.category = found._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }
  }

  const products = await Product.find(query).populate("category", "name slug");
  return NextResponse.json(products);
}
