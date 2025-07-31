import { prisma } from '@/lib/prisma';

export async function getServerSideProps(context: any) {
  const id = parseInt(context.query.id);
  const absen = await prisma.absen.findUnique({ where: { id } });
  return { props: { absen: JSON.parse(JSON.stringify(absen)) } };
}

export default function Detail({ absen }: any) {
  return (
    <main style={{ padding: 20 }}>
      <h1>Detail Absen</h1>
      <p>Nama: {absen.nama}</p>
      <p>Utusan: {absen.utusan}</p>
      <p>Pelatihan: {absen.pelatihan}</p>
      <p>Tanggal: {new Date(absen.tanggal).toLocaleString()}</p>
    </main>
  );
}
