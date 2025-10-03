import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { codigo, password } = await request.json();

    if (!codigo || !password) {
      return NextResponse.json(
        { message: 'Código y contraseña son requeridos.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { codigo_estudiante: codigo },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales inválidas.' },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenciales inválidas.' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    // Crear el token JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ user: userWithoutPassword })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Expira en 1 hora
      .sign(secret);

    const response = NextResponse.json(
      {
        message: 'Login exitoso.',
        user: userWithoutPassword,
      },
      { status: 200 }
    );

    response.cookies.set('user_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hora
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json(
      { message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}