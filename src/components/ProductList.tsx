import { ProductData } from "@/types/generalTypes";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ products }: { products: ProductData[] }) {
  if (products.length === 0) {
    return <p className="text-center">No hay productos en esta categoría.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
