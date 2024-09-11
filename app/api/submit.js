// app/api/submit.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, telegramLink } = req.body;

      if (!name || !telegramLink) {
        return res.status(400).json({ error: 'Name and Telegram link are required' });
      }

      // Генерация уникального ключа для каждой записи
      const timestamp = new Date().toISOString();
      const key = `submission:${timestamp}`;

      // Сохранение данных в Vercel KV
      await kv.set(key, { name, telegramLink });

      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

