import Link from "next/link";

interface Props {
  name: string;
  slug: string;
}

export default function CategoryCard({ name, slug }: Props) {
  return (
    <Link href={`/productos?category=${slug}`}>
      <div className="border border-slate-200 p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-lime-50 transition cursor-pointer text-center">
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      </div>
    </Link>
  );
}
