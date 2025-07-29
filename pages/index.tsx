'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';

export default function Home() {
  const [siswa, setSiswa] = useState<string[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('siswa') || '[]');
    setSiswa(data);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          backgroundColor: '#048a0f',
          color: '#fff',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h2 style={{ fontSize: '22px', marginBottom: '10px' }}>📋 Absensi</h2>
        <SidebarLink href="/">📌 Dashboard</SidebarLink>
        <SidebarLink href="/daftar">👥 Data Siswa</SidebarLink>
        <SidebarLink href="/tambah">➕ Tambah Siswa</SidebarLink>
        <SidebarLink href="/lihat-absen">📅 Lihat Absensi</SidebarLink>

        <SidebarLink href="#">🚪 Logout</SidebarLink>
      </aside>

      {/* Konten Utama */}
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ marginBottom: '30px', fontSize: '26px' }}>QR Code Absensi Siswa</h1>

        {siswa.length === 0 ? (
          <p style={{ fontSize: '16px' }}>Belum ada data siswa. Silakan <Link href="/tambah" style={{ color: '#048a0f', textDecoration: 'underline' }}>tambah siswa</Link>.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {siswa.map((nama, i) => {
           const linkAbsen = `https://absensiku-three.vercel.app/absen?nama=${encodeURIComponent(nama)}`;
              return (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    width: '250px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{nama}</p>
                  <QRCode value={linkAbsen} size={150} />
                  <p
                    style={{
                      fontSize: '12px',
                      marginTop: '10px',
                      wordWrap: 'break-word',
                      color: '#555',
                    }}
                  >
                    {linkAbsen}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

// Komponen Link Sidebar
function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <span style={{
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: '0.2s',
      }}>
        {children}
      </span>
    </Link>
  );
}
