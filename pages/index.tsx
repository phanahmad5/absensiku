import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [siswa, setSiswa] = useState<string[]>([]);

  // Ambil data dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const data = localStorage.getItem('siswa');
    if (data) {
      setSiswa(JSON.parse(data));
    }
  }, []);

  // Hapus siswa dari localStorage dan state
  const handleHapus = (namaHapus: string) => {
    const konfirmasi = confirm(`Hapus siswa "${namaHapus}"?`);
    if (!konfirmasi) return;

    const siswaBaru = siswa.filter((nama) => nama !== namaHapus);
    localStorage.setItem('siswa', JSON.stringify(siswaBaru));
    setSiswa(siswaBaru);
  };

  // Tentukan base URL berdasarkan mode dev / production
  const domain =
    process.env.NODE_ENV === 'production'
      ? 'https://absensiku.vercel.app' // Ganti sesuai domain deploy-mu
      : 'http://localhost:3000';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '220px',
          backgroundColor: '#048a0f',
          color: 'white',
          padding: '20px',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>Menu</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/" style={linkStyle}>📋 QR Siswa</a></li>
          <li><a href="/tambah" style={linkStyle}>➕ Tambah Siswa</a></li>
          <li><a href="/upload" style={linkStyle}>⬆️ Upload CSV</a></li>
          <li><a href="/absen" style={linkStyle}>🖊️ Halaman Absen</a></li>
          <li><a href="https://docs.google.com/spreadsheets" target="_blank" style={linkStyle}>📊 Google Sheet</a></li>
        </ul>
      </div>

      {/* Konten Utama */}
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>QR Code Absensi Siswa</h1>

        {siswa.length === 0 ? (
          <p>Belum ada data siswa. Silakan tambah siswa terlebih dahulu.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {siswa.map((nama, i) => {
              const linkAbsen = `${domain}/absen?nama=${encodeURIComponent(nama)}`;
              return (
                <div
                  key={i}
                  style={{
                    margin: '15px',
                    padding: '20px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    width: '230px',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>{nama}</p>
                  <div style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '8px' }}>
                    <QRCode value={linkAbsen} size={150} />
                  </div>
                  <p style={{ fontSize: '12px', marginTop: '10px', color: '#555', wordWrap: 'break-word' }}>
                    {linkAbsen}
                  </p>
                  <button
                    onClick={() => handleHapus(nama)}
                    style={{
                      marginTop: '10px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Hapus
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Gaya link sidebar
const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '10px 0',
  fontWeight: 'bold',
};
