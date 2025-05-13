import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "Todos los campos son obligatorios" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "El nombre de usuario o email ya está en uso" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        return NextResponse.json(
            { message: "Usuario registrado con éxito", userId: newUser._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return NextResponse.json(
            { message: "Error al registrar el usuario" },
            { status: 500 }
        );
    }
}
