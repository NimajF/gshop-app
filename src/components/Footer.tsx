export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="GShop"
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className="text-xl font-bold text-lime-600">GShop Grow</span>
          </div>
          <p className="text-sm text-gray-600">
            Tienda especializada en productos para cultivo. Disfrutá de la mejor
            calidad y asesoramiento.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm md:w-2/3">
          <div className="flex flex-col gap-2">
            <span className="text-lime-700 font-semibold uppercase text-xs tracking-wide">
              Navegación
            </span>
            <a href="/" className="hover:underline">
              Inicio
            </a>
            <a href="/productos" className="hover:underline">
              Productos
            </a>
            <a href="/contacto" className="hover:underline">
              Contacto
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lime-700 font-semibold uppercase text-xs tracking-wide">
              Redes
            </span>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              WhatsApp
            </a>
            <a href="#" className="hover:underline">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
        © 2025 GShop - Todos los derechos reservados.
      </div>
    </footer>
  );
}
