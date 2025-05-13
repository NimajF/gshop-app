import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const resCat = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?slug=${params.slug}`
  );
  const categoria = await resCat.json();

  if (!categoria || !categoria._id) return notFound();

  const resProd = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${categoria._id}`
  );
  const productos = await resProd.json();

  return (
    <div className="...">
      <h1 className="...">Categoría: {categoria.name}</h1>
      {/* map productos */}
    </div>
  );
}
