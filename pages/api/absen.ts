// pages/api/absen.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nama, utusan, pelatihan } = req.body;

    if (!nama || !utusan || !pelatihan) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyING-iZZIqRZalTgq1KyDhvuz8cc0fVmfAOXt-OKHuWw6r6PHDAepBVuRZttCEli-99w/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, utusan, pelatihan }),
      });

      const text = await response.text();

      return res.status(200).json({ message: text });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengirim ke Google Script' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
