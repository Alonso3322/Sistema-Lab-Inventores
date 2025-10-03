import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('user_session');

    if (!token) {
      return NextResponse.json(
        { message: 'No hay sesión activa' },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);

    return NextResponse.json(payload);

  } catch (error) {
    // Si el token es inválido o ha expirado, jwtVerify lanzará un error
    return NextResponse.json(
      { message: 'Sesión inválida o expirada' },
      { status: 401 }
    );
  }
}
