import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "ID de usuario inválido." },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Eliminar el usuario (eliminación física)
    // En el futuro podrías implementar eliminación lógica agregando un campo 'estado'
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "Usuario eliminado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "ID de usuario inválido." },
        { status: 400 }
      );
    }

    // Obtener usuario específico
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        codigo_estudiante: true,
        rol: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Mapear los datos para que coincidan con la interfaz esperada
    const mappedUser = {
      id_usuario: user.id,
      nombre: user.email || user.codigo_estudiante,
      rol: user.rol,
      estado: 1,
      codigo_estudiante: user.codigo_estudiante,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json(
      {
        message: "Usuario obtenido exitosamente.",
        user: mappedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}