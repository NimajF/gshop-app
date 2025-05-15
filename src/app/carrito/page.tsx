"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, selectQuantity } = useCartContext();
  const cartItems = Object.values(cart);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-12 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-lime-700 flex items-center gap-3 uppercase">
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          className="text-lime-600"
        >
          <path
            d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM7.16 16h9.72c.82 0 1.54-.5 1.84-1.26l2.58-6.19A1 1 0 0 0 20.4 7H6.21l-.94-2.36A2 2 0 0 0 3.42 3H2v2h1.42l3.6 9.59-1.35 2.44C4.52 17.37 5.48 19 7 19h12v-2H7.16z"
            fill="currentColor"
          />
        </svg>
        CARRITO DE COMPRAS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-100 rounded-md border border-slate-100">
              <Image
                src="/empty-cart.svg"
                alt="Carrito vacío"
                width={120}
                height={120}
                className="mb-4"
              />
              <p className="text-gray-500 text-lg uppercase">
                TU CARRITO ESTÁ VACÍO.
              </p>
              <Link
                href="/"
                className="mt-4 text-lime-600 hover:underline font-semibold uppercase"
              >
                IR A LA TIENDA
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <Link
                key={item._id}
                href={`/productos/${item.slug}`}
                className="block"
              >
                <div
                  className="flex items-center gap-6 bg-gray-50 rounded-md p-4 hover:shadow-lg transition group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <Image
                      src={
                        typeof item.images![0] === "string"
                          ? item.images![0]
                          : "/no-image.jpg"
                      }
                      alt={item.name}
                      fill
                      className="rounded-md object-cover border"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-md font-semibold text-gray-800 group-hover:underline uppercase">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2 uppercase">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="relative">
                        <select
                          value={item.quantity}
                          onClick={(e) => e.preventDefault()}
                          onChange={(e) =>
                            selectQuantity(Number(e.target.value), item._id)
                          }
                          className="appearance-none outline-none ring-0 border border-slate-200 rounded px-3 py-1 bg-gray-100 focus:ring-2 focus:ring-lime-400 pr-8 text-gray-700 font-medium transition uppercase"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option
                              key={qty}
                              value={qty}
                              className="bg-white text-gray-700 font-semibold uppercase"
                            >
                              {qty} {qty === 1 ? "UNIDAD" : "UNIDADES"}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M7 8l3 3 3-3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromCart(item._id);
                          }}
                          className="ml-5 text-sm text-red-500 hover:underline hover:text-red-700 transition uppercase"
                        >
                          ELIMINAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Resumen */}
        <div className="bg-gray-50 rounded-md p-8 sticky top-8 self-start">
          <h2 className="text-lg font-bold mb-6 text-lime-700 uppercase">
            RESUMEN DEL PEDIDO
          </h2>

          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500 uppercase">SUBTOTAL</span>
            <span className="text-gray-900 uppercase">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500 uppercase">ENVÍO ESTIMADO</span>
            <span className="text-gray-900 uppercase">$5.00</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500 uppercase">IMPUESTOS ESTIMADOS</span>
            <span className="text-gray-900 uppercase">$0.00</span>
          </div>

          <div className="flex justify-between py-4 font-sans text-md border-t mt-6">
            <span className="text-gray-800 uppercase">TOTAL</span>
            <span className="text-gray-900 uppercase">
              ${(subtotal + 5).toFixed(2)}
            </span>
          </div>

          <button
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 rounded-md transition text-md mt-4 shadow disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            disabled={cartItems.length === 0}
          >
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
}
