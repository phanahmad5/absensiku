import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Absen() {
  const router = useRouter();
  const { nama, utusan, pelatihan } = router.query;
  const [status, setStatus] = useState('Mengirim absensi...');

  useEffect(() => {
    if (!nama || !utusan || !pelatihan) return;

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
              pelatihan: Array.isArray(pelatihan) ? pelatihan.join(',') : pelatihan,
            }),
          }
        );

        if (response.ok) {
          setStatus(`Terima kasih, ${nama}! Absensi berhasil.`);
        } else {
          setStatus('Gagal mengirim absensi. Coba lagi.');
          console.error('Respon tidak OK:', await response.text());
        }
      } catch (err) {
        setStatus('Gagal mengirim absensi.');
        console.error('Error saat mengirim:', err);
      }
    };

    kirimAbsensi();
  }, [nama, utusan, pelatihan]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>{status}</h1>
    </div>
  );
}
