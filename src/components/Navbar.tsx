"use client";

import Link from "next/link";
import { FiShoppingCart, FiUser, FiLogIn, FiLogOut } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { TbPencilPlus } from "react-icons/tb";
import { categories } from "@/constants/constants";
import { useSession, signIn, signOut } from "next-auth/react";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { CartContextType, useCartContext } from "@/context/CartContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const { cart }: CartContextType = useCartContext();
  console.log("cart", cart);

  // Calculate total number of items in the cart
  const cartNumber = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-lime-600 tracking-tight uppercase"
        >
          GSHOP
        </Link>

        {/* Menú de navegación (pantalla grande) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-950 ml-8 flex-1">
          <Link
            href={`/productos?category=${categories[0].slug}`}
            className="uppercase hover:text-lime-600 transition"
          >
            PRODUCTOS
          </Link>
          <Link
            href="/contacto"
            className="uppercase hover:text-lime-600 transition"
          >
            CONTACTO
          </Link>
        </div>

        <div className="flex items-center gap-4 text-gray-950">
          <Link href="/carrito" className="uppercase">
            <span className="relative inline-flex items-center">
              <IoCartOutline className="text-gray-950 text-2xl hover:text-lime-600 transition" />
              {cartNumber > 0 && (
                <span className="absolute -top-2 -right-2 bg-lime-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartNumber}
                </span>
              )}
            </span>
          </Link>

          {status === "loading" ? null : session ? (
            <>
              {isAdmin && (
                <Link href="/createProduct" className="uppercase">
                  <TbPencilPlus
                    className="text-2xl text-lime-600 hover:text-lime-800 transition"
                    title="ADMIN PANEL"
                  />
                </Link>
              )}
              <Link href="/perfil" className="uppercase">
                <FiUser className="text-gray-950 cursor-pointer text-2xl hover:text-lime-600 transition" />
              </Link>
              <button
                onClick={() => signOut()}
                title="CERRAR SESIÓN"
                className="uppercase"
              >
                <FiLogOut className="text-gray-950 text-2xl hover:text-lime-600 cursor-pointer transition" />
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              title="INICIAR SESIÓN"
              className="uppercase"
            >
              <FiLogIn className="text-gray-950 text-2xl hover:text-lime-600 transition" />
            </button>
          )}

          {/* Menú mobile */}
          <button className="md:hidden uppercase">
            <HiOutlineMenu className="text-2xl hover:text-lime-600 transition" />
          </button>
        </div>
      </nav>
    </header>
  );
}
