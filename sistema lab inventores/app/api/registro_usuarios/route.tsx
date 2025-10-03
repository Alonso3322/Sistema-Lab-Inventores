
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { nombre, telefono, email, rol, password, codigo, carrera } = await request.json();

    // --- Validación ---
    if (!nombre || !email || !rol || !password || !codigo || !carrera) {
      return NextResponse.json(
        { message: "Nombre, email, rol, código, carrera y contraseña son requeridos." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    // --- Verificar si el usuario o código ya existe ---
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado." },
        { status: 409 } // 409 Conflict
      );
    }

    const existingUserByCodigo = await prisma.user.findUnique({
        where: { codigo_estudiante: codigo },
    });

    if (existingUserByCodigo) {
        return NextResponse.json(
            { message: "El código de estudiante ya está registrado." },
            { status: 409 }
        );
    }

    // --- Encriptar contraseña ---
    const hashedPassword = await hash(password, 10);

    // --- Crear usuario ---
    const newUser = await prisma.user.create({
      data: {
        nombre: nombre,
        telefono: telefono || null,
        email: email,
        codigo_estudiante: codigo,
        carrera: carrera,
        password: hashedPassword,
        rol: rol, 
      },
    });

    // --- Enviar respuesta (sin la contraseña) ---
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente.",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
