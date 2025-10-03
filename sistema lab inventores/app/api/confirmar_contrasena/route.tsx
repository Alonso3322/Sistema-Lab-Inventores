// pages/api/confirmar_contrasena.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import {prisma} from '@/lib/prisma'; // Ajusta a tu import de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { codigo_estudiante, newPassword } = req.body;

  if (!codigo_estudiante || !newPassword) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const usuario = await prisma.user.update({
      where: { codigo_estudiante: codigo_estudiante },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
}
