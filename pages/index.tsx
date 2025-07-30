import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleGenerate = () => {
    const link = `${window.location.origin}/absen?nama=${encodeURIComponent(nama)}`;
    setQrValue(link);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Generate QR Code Absensi</h1>
      <input
        type="text"
        placeholder="Masukkan Nama Siswa"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate QR</button>

      {qrValue && (
        <div style={{ marginTop: 20 }}>
          <QRCode value={qrValue} />
          <p>{qrValue}</p>
        </div>
      )}
    </div>
  );
}
