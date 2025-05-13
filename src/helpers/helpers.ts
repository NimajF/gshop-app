import { ProductData, ProductFormData } from "@/types/generalTypes";
import axios from "axios";

export async function createProduct(data: ProductFormData) {
  try {
    let images: string[] = [];

    if (data.images && data.images.length > 0) {
      const fileImages = data.images.filter(
        (img) => typeof img !== "string"
      ) as File[];

      images = await Promise.all(fileImages.map(uploadImage));
    }
    console.log("Imágenes subidas:", images);
    const response = await axios.post("/api/products/createProduct", {
      ...data,
      images,
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al crear el producto:", error.message);
    return {
      success: false,
      message: error.message || "Fallo al crear el producto",
    };
  }
}

export async function getProduct(slug: string) {
  try {
    const response = await axios.get(`/api/products/${slug}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al obtener los productos:", error.message);
    return {
      success: false,
      message: error.message || "Fallo al obtener los productos",
    };
  }
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "munrocultiva");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Respuesta de Cloudinary:", data);
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Error: No se pudo obtener la URL de la imagen.");
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen a Cloudinary.");
  }
}

// DESTROY IMAGE
export async function destroyImage(imageUrl: string) {
  try {
    console.log("Destruyendo imagen:", imageUrl);
    const response = await axios.delete(`/api/user/uploadImage`, {
      data: { imageUrl },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al eliminar la imagen:", error);
    return {
      success: false,
      message: error.message || "Failed to delete image",
    };
  }
}
