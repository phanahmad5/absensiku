import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TambahSiswa() {
  const [nama, setNama] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kirim nama ke localStorage sementara (karena belum pakai database)
    const dataSiswa = JSON.parse(localStorage.getItem('siswa') || '[]');
    dataSiswa.push(nama);
    localStorage.setItem('siswa', JSON.stringify(dataSiswa));

    alert(`Siswa ${nama} berhasil ditambahkan!`);
    router.push('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Tambah Siswa</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nama">Nama Lengkap:</label>
        <br />
        <input
          type="text"
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          style={{
            padding: '10px',
            margin: '10px 0',
            width: '300px',
            fontSize: '16px',
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#048a0f',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
