'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Absen() {
  const searchParams = useSearchParams();
  const nama = searchParams.get('nama');
  const [status, setStatus] = useState('Memproses absensi...');

  useEffect(() => {
    if (nama) {
      // Simulasi kirim absensi ke server
      setTimeout(() => {
        // Di sini bisa diganti dengan fetch POST ke server API
        setStatus(`Absensi berhasil dikirim untuk: ${nama}`);
      }, 1000);
    } else {
      setStatus('Nama siswa tidak ditemukan di URL.');
    }
  }, [nama]);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <h1>Halaman Absensi</h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{status}</p>
    </div>
  );
}
