import { prisma } from '@/lib/prisma';

export async function getServerSideProps() {
  const data = await prisma.absen.findMany({ orderBy: { tanggal: 'desc' } });
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function Daftar({ data }: any) {
  return (
    <main style={{ padding: 20 }}>
      <h1>Daftar Kehadiran</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            <a href={`/detail?id=${item.id}`}>
              {item.nama} - {item.pelatihan} - {new Date(item.tanggal).toLocaleString()}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
