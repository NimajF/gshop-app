import { ProductData } from "@/types/generalTypes";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductData }) {
  const imageUrl =
    product.images?.find((img) => typeof img === "string") || "/no-image.jpg";

  return (
    <div className="bg-slate-100 border border-gray-100 rounded-md hover:shadow-md transition-all duration-200 group">
      <div className="mb-5">
        <div className="relative w-full h-48 rounded-t-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold text-gray-900 truncate mb-1 tracking-tight">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 truncate">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-5">
          <span className="text-slate-700 font-mono text-base">
            $ {product.price.toFixed(2)}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.stock > 0 ? "En stock" : "Agotado"}
          </span>
        </div>
        <Link
          href={`/productos/${product.slug}`}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-700 rounded-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-150"
        >
          Ver más
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
