import { categories } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SidebarCategoryFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("category");

  return (
    <aside className="w-60 sticky top-24 h-max bg-white p-6 text-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Categorías</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href={`/productos`}
            className={`block px-3 py-2 rounded-md transition-all duration-200 ${
              !current
                ? "bg-lime-200 font-bold text-lime-800 shadow-sm"
                : "text-gray-800 hover:bg-gray-100 hover:shadow-sm"
            }`}
          >
            Todas
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/productos?category=${cat.slug}`}
              className={`block px-3 py-2 rounded-md transition-all duration-200 ${
                current === cat.slug
                  ? "bg-lime-200 font-bold text-lime-800 shadow-sm"
                  : "text-gray-800 hover:bg-gray-100 hover:shadow-sm"
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
