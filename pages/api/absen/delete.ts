import { prisma } from '@/lib/prisma';

export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    const id = parseInt(req.query.id);
    await prisma.absen.delete({ where: { id } });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).end();
  }
}
