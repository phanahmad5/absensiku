'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('Susbalan');

  const baseUrl = 'https://absensiku-three.vercel.app/absen';
  const qrValue = `${baseUrl}?nama=${encodeURIComponent(nama)}&utusan=${encodeURIComponent(utusan)}&pelatihan=${encodeURIComponent(pelatihan)}`;

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>🧾 Generator QR Absen</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Nama:</strong></label><br />
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama lengkap"
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Utusan:</strong></label><br />
        <input
          type="text"
          value={utusan}
          onChange={(e) => setUtusan(e.target.value)}
          placeholder="Contoh: SMPN 1 Bandung"
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Pelatihan:</strong></label><br />
        <select
          value={pelatihan}
          onChange={(e) => setPelatihan(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        >
          <option value="Susbalan">Susbalan</option>
          <option value="PKL">PKL</option>
        </select>
      </div>

      {nama && utusan ? (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p><strong>QR Code untuk absen:</strong></p>
          <div style={{ display: 'inline-block', padding: '1rem', background: '#fff', border: '1px solid #ccc' }}>
            <QRCode value={qrValue} size={160} />
          </div>
          <p style={{ marginTop: '1rem' }}>
            Link: <a href={qrValue} target="_blank" rel="noopener noreferrer">{qrValue}</a>
          </p>
        </div>
      ) : (
        <p style={{ color: 'gray' }}>Isi nama dan utusan terlebih dahulu untuk membuat QR Code.</p>
      )}
    </main>
  );
}
