// pages/absen.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AbsenPage() {
  const router = useRouter();
  const { nama, utusan, pelatihan } = router.query;

  const [status, setStatus] = useState('Mengirim data...');

  useEffect(() => {
    if (nama && utusan && pelatihan) {
      fetch('/api/absen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, utusan, pelatihan }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Sukses') {
            setStatus(`✅ Anda berhasil absen atas nama ${nama}`);
          } else {
            setStatus('❌ Gagal: ' + data.message);
          }
        })
        .catch(() => {
          setStatus('❌ Terjadi kesalahan saat mengirim data.');
        });
    }
  }, [nama, utusan, pelatihan]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Absensi Peserta</h1>
      <p><strong>Nama:</strong> {nama}</p>
      <p><strong>Utusan:</strong> {utusan}</p>
      <p><strong>Pelatihan:</strong> {pelatihan}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}
