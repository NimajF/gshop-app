"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { ProductData } from "@/types/generalTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CategoryType } from "@/types/generalTypes";
import { getProduct } from "@/helpers/helpers";

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCartContext();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct(slug as string);
      if (!res.success) return;
      setProduct(res.data);
      setCategory(res.data.category);
      setLoading(false);
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading || !product)
    return <p className="text-center mt-10">Cargando producto...</p>;

  const imageUrl =
    product.images?.find((img) => typeof img === "string") || "/no-image.jpg";

  return (
    <div className="min-h-screen">
      <div className="bg-white max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:py-20 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="w-full flex justify-center">
            <Image
              src={imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-sm object-contain w-full max-w-xs sm:max-w-sm md:max-w-md"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <p className="text-green-600 text-lg sm:text-xl font-semibold">
              ${product.price}
            </p>
            <p className="text-gray-600 text-base">{product.description}</p>
            <p className="text-sm text-gray-400">
              Categoría:{" "}
              {typeof product.category === "object" &&
              "name" in product.category &&
              category ? (
                <a
                  href={`/productos?category=${category.slug}`}
                  className="text-lime-700 hover:underline"
                >
                  {category.name}
                </a>
              ) : (
                product.category
              )}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full sm:w-auto bg-lime-600 hover:bg-lime-700 text-white font-medium px-6 py-2 rounded-sm transition"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
