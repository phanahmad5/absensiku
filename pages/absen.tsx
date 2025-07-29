import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Absen() {
  const router = useRouter();
  const { nama } = router.query;
  const [status, setStatus] = useState('Menyiapkan absensi...');

  useEffect(() => {
    if (!router.isReady) return; // pastikan router siap
    if (typeof nama !== 'string') {
      setStatus('Nama tidak ditemukan di URL.');
      return;
    }

    setStatus('Mengirim absensi...');

    fetch('https://script.google.com/macros/s/AKfycbxbfCAf3HNaEVgfUdzS6_fjmeD-WAmdEEM95SfJghBgO3ue2nKxzPH-Flf--TWruABL/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama }),
    })
      .then((res) => res.text())
      .then(() => {
        setStatus(`✅ Terima kasih, ${nama}! Absensi berhasil dikirim.`);
      })
      .catch((err) => {
        setStatus('❌ Gagal mengirim absensi. Silakan coba lagi.');
        console.error('Error:', err);
      });
  }, [router.isReady, nama]);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Absensi Siswa</h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{status}</p>
    </div>
  );
}
