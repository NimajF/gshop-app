"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/register", form);
      const result = await signIn("credentials", {
        username: form.username,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        setError("Error al iniciar sesión automáticamente.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Error desconocido";
      setError(msg);
      console.error("Error durante registro/login:", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="p-8 w-full max-w-sm bg-white rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="bg-gray-50 mt-1 text-slate-500 block w-full px-4 py-2 border border-lime-400 rounded-md focus:ring focus:ring-lime-400 focus:outline-none"
            placeholder="Nombre de usuario"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-50 mt-1 text-slate-500 block w-full px-4 py-2 border border-lime-400 rounded-md focus:ring focus:ring-lime-400 focus:outline-none"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-50 mt-1 text-slate-500 block w-full px-4 py-2 border border-lime-400 rounded-md focus:ring focus:ring-lime-400 focus:outline-none"
            placeholder="●●●●●●●●"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-2 rounded-md hover:bg-lime-700 transition"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
