import { prisma } from '@/lib/prisma';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { nama, utusan, pelatihan } = req.body;
    const absen = await prisma.absen.create({ data: { nama, utusan, pelatihan } });
    res.status(200).json(absen);
  } else {
    res.status(405).end();
  }
}
