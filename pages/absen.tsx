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
        await fetch('https://script.google.com/macros/s/AKfycbzaJ5zDOvQQznUHzFvs4tb3yZ-fQeUcUVI2Ek2LgszG-wX2zzh7NDys0ObBxSgjPMnmpg/exec', {
          method: 'POST',
          body: JSON.stringify({
            nama,
            utusan,
            pelatihan,
          }),
        });
        setStatus(`Terima kasih, ${nama}! Absensi berhasil.`);
      } catch (err) {
        setStatus('Gagal mengirim absensi.');
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
