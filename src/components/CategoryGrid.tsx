import {categories} from "@/constants/constants";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
    return (
        <section className="py-12 px-4 max-w-6xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard key={category.slug} name={category.name} slug={category.slug} />
                ))}
            </div>
        </section>
    );
}