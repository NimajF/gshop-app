import { v2 as cloudinary } from "cloudinary";
import { console } from "inspector";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});
export async function POST(req: Request) {
  const body = (await req.json()) as { paramsToSign: Record<string, string> };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.sign_request(paramsToSign, {
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  });
  return NextResponse.json({ signature });
}

export async function DELETE(req: Request) {
  try {
    const { imageUrl } = await req.json();
    const lastPart = imageUrl.split("/").slice(-2).join("/");
    const publicId = lastPart.split(".").slice(0, -1).join(".");

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Invalid image URL" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete image",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
