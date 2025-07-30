import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Absen() {
  const router = useRouter();
  const { nama, utusan, pelatihan } = router.query;
  const [status, setStatus] = useState('Mengirim absensi...');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Jangan kirim absensi jika parameter belum siap
    if (!router.isReady || !nama || !utusan || !pelatihan) return;

    // Hindari pengiriman ulang
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
              nama,
              utusan,
              pelatihan: Array.isArray(pelatihan) ? pelatihan.join(', ') : pelatihan,
            }),
          }
        );

        if (response.ok) {
          setStatus(`✅ Terima kasih, ${nama}! Absensi berhasil dikirim.`);
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
  }, [router.isReady, nama, utusan, pelatihan]);

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
