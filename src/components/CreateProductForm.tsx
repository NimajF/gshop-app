"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageInputComponent from "./ImageInput";
import { uploadImage } from "@/helpers/helpers";
import { ProductData, ProductFormData } from "@/types/generalTypes";
import { CategoryType } from "@/types/generalTypes";
import { createProduct } from "@/helpers/helpers";
import { slugify } from "@/scripts/slugify";

type FormData = {
  name: string;
  slug?: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[]; // URLs de Cloudinary
  published: boolean;
};

export default function CreateProductForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    images: [],
    published: false,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem("categories");
    if (cached) {
      setCategories(JSON.parse(cached));
    } else {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          localStorage.setItem("categories", JSON.stringify(data));
        })
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = e.currentTarget.files;
  //     if (files && files.length > 0) {
  //       const file = files[0];
  //       const previewUrl = URL.createObjectURL(file);
  //       setPreviewImage(previewUrl);
  //       setPreviewImages((prev) => [...prev, previewUrl]);
  //       setForm((prevData) => ({
  //         ...prevData,
  //         imageFile: file,
  //       }));
  //     }
  //   };
  //   const handleImagesUploaded = (urls: string[]) => {
  //     setForm((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...urls],
  //     }));
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createProduct({
      ...form,
      images: files,
    } as ProductFormData);

    if (res.success) {
      console.log("Producto creado:", res.data);
      setForm({
        name: "",
        slug: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        images: [],
        published: false,
      });
      setPreviewImages([]);
      setFiles([]);
    } else {
      console.error("Error:", res.message);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(newPreviews);
    }
  }, [files]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Crear nuevo producto</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre del producto
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio (ARS)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes
        </label>

        <ImageInputComponent onFilesSelected={setFiles} />

        {/* Previews con botón para eliminar */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {previewImages.map((url, index) => (
              <div key={index} className="relative group">
                <Image
                  src={url}
                  alt={`Imagen ${index}`}
                  width={200}
                  height={200}
                  className="rounded-md object-cover w-full h-32"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                    setFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Publicar producto
        </label>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Guardar producto
      </button>
    </form>
  );
}
