'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TambahAbsen() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('Susbalan');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/absen/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, utusan, pelatihan }),
    });
    router.push('/daftar');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Tambah Absen</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
        <input placeholder="Utusan" value={utusan} onChange={(e) => setUtusan(e.target.value)} required />
        <select value={pelatihan} onChange={(e) => setPelatihan(e.target.value)}>
          <option value="Susbalan">Susbalan</option>
          <option value="PKL">PKL</option>
        </select>
        <button type="submit">Simpan</button>
      </form>
    </main>
  );
}
