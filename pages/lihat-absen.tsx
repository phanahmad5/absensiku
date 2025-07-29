'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LihatAbsen() {
  const [absensi, setAbsensi] = useState<{ nama: string; waktu: string }[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('absensi') || '[]');
    setAbsensi(data);
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Daftar Absensi Siswa</h1>
      <Link href="/" style={{ color: '#048a0f', textDecoration: 'underline' }}>← Kembali ke Dashboard</Link>
      {absensi.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Belum ada siswa yang absen.</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tdStyle}>No</th>
              <th style={tdStyle}>Nama</th>
              <th style={tdStyle}>Waktu Absen</th>
            </tr>
          </thead>
          <tbody>
            {absensi.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.nama}</td>
                <td style={tdStyle}>{item.waktu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tdStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left' as const,
};
