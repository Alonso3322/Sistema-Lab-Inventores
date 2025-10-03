import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  try {
    // En una aplicación real, aquí conectarías a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    
    const impresionesEjemplo = [
      {
        id: 1,
        archivo: 'pieza_robot.gcode',
        usuario: 'Juan Pérez',
        impresora: 'Ender-3 Pro',
        fecha: '2024-01-15 14:30',
        estado: 'Completado'
      },
      {
        id: 2,
        archivo: 'engrane.stl',
        usuario: 'María García',
        impresora: 'CR-10',
        fecha: '2024-01-15 16:45',
        estado: 'En progreso'
      },
      {
        id: 3,
        archivo: 'soporte_pieza.gcode',
        usuario: 'Carlos López',
        impresora: 'Ender-3 V2',
        fecha: '2024-01-14 10:15',
        estado: 'Fallido'
      }
    ];

    return NextResponse.json(impresionesEjemplo);
  } catch (error) {
    console.error('Error obteniendo impresiones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
