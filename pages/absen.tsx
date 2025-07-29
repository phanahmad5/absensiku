import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Absen() {
  const router = useRouter();
  const { nama } = router.query;
  const [status, setStatus] = useState('Mengirim absensi...');

  useEffect(() => {
    if (!nama) return;

    fetch('https://script.google.com/macros/s/AKfycbwfNblUe6E0BYynhAWU41VQrvY7SaleVOinT3wsdVU-6nfPJkwwvIS_0b8nOZ2JznQY1Q/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama }),
    })
      .then((res) => res.text())
      .then(() => {
        setStatus(`Terima kasih, ${nama}! Absensi berhasil.`);
      })
      .catch((err) => {
        setStatus('Gagal mengirim absensi.');
        console.error(err);
      });
  }, [nama]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Absensi</h1>
      <p>{status}</p>
    </div>
  );
}
