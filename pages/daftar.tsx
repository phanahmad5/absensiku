'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DaftarSiswa() {
  const [siswa, setSiswa] = useState<string[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('siswa') || '[]');
    setSiswa(data);
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Daftar Siswa</h1>
      <Link href="/tambah">
        <button
          style={{
            margin: '10px 0',
            padding: '10px 20px',
            backgroundColor: '#048a0f',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Tambah Siswa
        </button>
      </Link>
      {siswa.length === 0 ? (
        <p>Belum ada data siswa.</p>
      ) : (
        <ul style={{ marginTop: '20px' }}>
          {siswa.map((nama, index) => (
            <li key={index} style={{ padding: '5px 0' }}>
              {index + 1}. {nama}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
