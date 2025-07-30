import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Absen() {
  const router = useRouter();
  const [status, setStatus] = useState('Mengirim absensi...');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    // Ambil parameter sebagai string
    const namaParam = Array.isArray(router.query.nama) ? router.query.nama[0] : router.query.nama;
    const utusanParam = Array.isArray(router.query.utusan) ? router.query.utusan[0] : router.query.utusan;
    const pelatihanParam = Array.isArray(router.query.pelatihan)
      ? router.query.pelatihan.join(', ')
      : router.query.pelatihan;

    if (!namaParam || !utusanParam || !pelatihanParam) {
      setStatus('❌ Data absensi tidak lengkap.');
      return;
    }

    if (isSending) return;
    setIsSending(true);

    const kirimAbsensi = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbzaJ5zDOvQQznUHzFvs4tb3yZ-fQeUcUVI2Ek2LgszG-wX2zzh7NDys0ObBxSgjPMnmpg/exec',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nama: namaParam,
              utusan: utusanParam,
              pelatihan: pelatihanParam,
            }),
          }
        );

        if (response.ok) {
          setStatus(`✅ Terima kasih, ${namaParam}! Absensi berhasil dikirim.`);
        } else {
          const errMsg = await response.text();
          console.error('Respon tidak OK:', errMsg);
          setStatus('❌ Gagal mengirim absensi. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Kesalahan saat mengirim absensi:', error);
        setStatus('❌ Terjadi kesalahan saat mengirim absensi.');
      }
    };

    kirimAbsensi();
  }, [router.isReady, router.query]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1>{status}</h1>
    </div>
  );
}
