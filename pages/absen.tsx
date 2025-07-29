'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function AbsenPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Memproses absensi...');
  const router = useRouter();

  useEffect(() => {
    const nama = searchParams.get('nama');
    if (!nama) {
      setStatus('Nama tidak ditemukan di URL.');
      return;
    }

    const waktuSekarang = new Date().toLocaleString('id-ID', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    // Ambil absensi lama dari localStorage
    const dataAbsen = JSON.parse(localStorage.getItem('absensi') || '[]');

    // Cek jika siswa sudah absen (opsional, hanya jika ingin mencegah duplikat)
    const sudahAbsen = dataAbsen.find((item: any) => item.nama === nama);
    if (sudahAbsen) {
      setStatus(`Siswa "${nama}" sudah pernah absen!`);
      return;
    }

    // Tambahkan data baru
    const dataBaru = [...dataAbsen, { nama, waktu: waktuSekarang }];
    localStorage.setItem('absensi', JSON.stringify(dataBaru));

    setStatus(`✅ Absensi berhasil untuk "${nama}" pada ${waktuSekarang}`);

    // Optional: Redirect ke halaman /lihat-absen
    // setTimeout(() => router.push('/lihat-absen'), 3000);
  }, [searchParams]);

  return (
    <div style={{
      fontFamily: 'Arial',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
    }}>
      <div>
        <h1>Halaman Absensi</h1>
        <p style={{ marginTop: '20px', fontSize: '18px' }}>{status}</p>
      </div>
    </div>
  );
}
