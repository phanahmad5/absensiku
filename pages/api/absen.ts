import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { nama } = req.body;

    const webhookUrl = 'https://script.google.com/macros/s/AKfycbxbfCAf3HNaEVgfUdzS6_fjmeD-WAmdEEM95SfJghBgO3ue2nKxzPH-Flf--TWruABL/exec';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama }),
      });

      res.status(200).json({ message: 'Absensi berhasil dikirim' });
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengirim absensi', error: err });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
