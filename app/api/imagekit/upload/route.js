import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";

// Initialize ImageKit

export const runtime = "nodejs";
export async function POST(request) {
    console.log("PUBLIC:", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
    console.log("PRIVATE:", process.env.IMAGEKIT_PRIVATE_KEY);
    console.log("ENDPOINT:", process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT);
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });
    
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFileName =
      fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;

    // Upload to ImageKit - Simple server-side upload
    const uploadResponse = await imagekit.upload({
  file: buffer.toString("base64"),
  fileName: uniqueFileName,
  folder: "/projects",
});

    // Generate thumbnail URL using ImageKit transformations
    const thumbnailUrl = imagekit.url({
      src: uploadResponse.url,
      transformation: [
        {
          width: 400,
          height: 300,
          cropMode: "maintain_ar",
          quality: 80,
        },
      ],
    });

    // Return upload data
    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      thumbnailUrl: thumbnailUrl,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name,
    });
  } catch (error) {
  console.error("UPLOAD ERROR FULL:", error);
  console.error("UPLOAD ERROR MESSAGE:", error?.message);
  console.error("UPLOAD ERROR STACK:", error?.stack);

  return NextResponse.json(
    {
      success: false,
      error: error?.message || "Unknown error",
    },
    { status: 500 }
  );
}
}