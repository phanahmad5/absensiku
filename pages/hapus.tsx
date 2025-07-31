import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Hapus() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/absen/delete?id=${id}`, {
        method: 'DELETE',
      }).then(() => router.push('/daftar'));
    }
  }, [id]);

  return <p>Hapus data...</p>;
}
