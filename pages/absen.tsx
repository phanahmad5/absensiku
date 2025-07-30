import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Absen() {
  const router = useRouter();
  const [status, setStatus] = useState('Mengirim absensi...');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const nama = router.query.nama;
    const utusan = router.query.utusan;
    const pelatihan = router.query.pelatihan;

    if (!nama || !utusan || !pelatihan) {
      setStatus('❌ Data absensi tidak lengkap.');
      return;
    }

    if (isSending) return;
    setIsSending(true);

    const kirimAbsensi = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbx4iW_Irrufb0QLcY5-oeleoOYWuOrGlQyx2ToRg9tH-AVdNdIvlH26cuhZemc7Zmpu_A/exec',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nama,
              utusan,
              pelatihan,
            }),
          }
        );

        const text = await response.text(); // Ambil isi respon

        if (response.ok && text.includes('Success')) {
          setStatus(`✅ Terima kasih, ${nama}! Absensi berhasil dikirim.`);
        } else {
          console.error('Respon tidak OK:', text);
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
