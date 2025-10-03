import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Crear una respuesta para redirigir al usuario a la página de login.
    const response = NextResponse.redirect(new URL('/login', request.url));

    // Establecer la cookie en la respuesta para eliminarla del navegador.
    response.cookies.set('user_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // La cookie expira inmediatamente.
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // Incluso si hay un error, intenta redirigir al usuario a login.
    return NextResponse.redirect(new URL('/login', request.url));
  }
}