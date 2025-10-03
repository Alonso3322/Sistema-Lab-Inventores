// app/api/verificar-codigo/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { codigo_estudiante } = await req.json();

    if (!codigo_estudiante) {
      return NextResponse.json({ message: 'El código es obligatorio' }, { status: 400 });
    }

    // Buscar usuario por código de estudiante
    const user = await prisma.user.findUnique({
      where: { codigo_estudiante },
      select: {
        codigo_estudiante: true,
        nombre: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'Código de estudiante no encontrado' }, { status: 404 });
    }

    // 🔹 Ahora enviamos también el nombre
    return NextResponse.json(
      { message: 'Código válido', codigo_estudiante: user.codigo_estudiante, nombre: user.nombre },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
