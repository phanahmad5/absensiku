import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState<string[]>([]);
  const [qrValue, setQrValue] = useState('');

  const handleGenerate = () => {
    const params = new URLSearchParams({
      nama,
      utusan,
      pelatihan: pelatihan.join(','),
    });

    const link = `https://absensiku-three.vercel.app/absen?${params.toString()}`;
    setQrValue(link);
  };

  const togglePelatihan = (value: string) => {
    setPelatihan((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Generate QR Code Absensi</h1>
      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Utusan"
        value={utusan}
        onChange={(e) => setUtusan(e.target.value)}
        style={{ marginTop: 8 }}
      />
      <br />
      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={pelatihan.includes('Susbalan')}
            onChange={() => togglePelatihan('Susbalan')}
          />{' '}
          Susbalan
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={pelatihan.includes('PKL')}
            onChange={() => togglePelatihan('PKL')}
          />{' '}
          PKL
        </label>
      </div>

      <button onClick={handleGenerate} style={{ marginTop: 12 }}>
        Generate QR
      </button>

      {qrValue && (
        <div style={{ marginTop: 20 }}>
          <QRCode value={qrValue} />
          <p>{qrValue}</p>
        </div>
      )}
    </div>
  );
}
