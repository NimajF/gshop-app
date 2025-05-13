// app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            setError("Usuario o contraseña incorrectos");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Usuario
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-50 mt-1 text-slate-500 block w-full px-4 py-2 border border-lime-400 rounded-md focus:ring focus:ring-lime-400 focus:outline-none"
                        placeholder={"Nombre de usuario"}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 mt-1 text-slate-500 block w-full px-4 py-2 border border-lime-400 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                        placeholder={"●●●●●●●●"}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-lime-600 text-white py-2 rounded-md hover:bg-lime-700 transition"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}
