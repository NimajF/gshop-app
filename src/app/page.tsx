"use client"

import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col bg-white">
        <HeroSection />

        <section className="px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-10">
            Explorá nuestras categorías
          </h2>
          <CategoryGrid />
        </section>

        <section className="text-center py-16 bg-lime-50 px-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            ¿Primera vez en GSHOP?
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Descubrí productos únicos para cultivo, accesorios y más. Todo en un solo lugar.
          </p>
          <a
              href="/register"
              className="inline-block bg-lime-600 text-white px-6 py-3 rounded-md font-medium hover:bg-lime-700 transition"
          >
            Crear cuenta
          </a>
        </section>
      </main>
  );
}

