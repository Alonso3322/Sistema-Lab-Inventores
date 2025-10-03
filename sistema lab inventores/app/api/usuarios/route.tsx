import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Obtener todos los usuarios activos
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        codigo_estudiante: true,
        rol: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Mapear los datos para que coincidan con la interfaz esperada
    const mappedUsers = users.map(user => ({
      id_usuario: user.id,
      nombre: user.nombre, // Usar email como nombre o código si no hay email
      rol: user.rol,
      estado: 1, // Todos los usuarios en la base son activos
      codigo_estudiante: user.codigo_estudiante,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return NextResponse.json(
      {
        message: "Usuarios obtenidos exitosamente.",
        users: mappedUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}