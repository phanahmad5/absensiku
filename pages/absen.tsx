import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Absen() {
  const router = useRouter();
  const { nama } = router.query;

  useEffect(() => {
    if (nama) {
      // Kirim ke Google Sheet atau API endpoint
      fetch('/api/absen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama }),
      });
    }
  }, [nama]);

  return (
    <div>
      <h2>Terima kasih, {nama}</h2>
      <p>Absensi Anda telah direkam.</p>
    </div>
  );
}
