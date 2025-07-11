import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory rate limit map (resets on serverless cold start)
const submissionMap = new Map<string, { count: number; last: number }>();

const SUBMISSION_LIMIT = 3;
const WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = submissionMap.get(ip);
  if (entry && now - entry.last < WINDOW_MS) {
    if (entry.count >= SUBMISSION_LIMIT) {
      return res.status(429).json({ error: 'Submission limit reached for this IP. Try again next month.' });
    }
    entry.count += 1;
    entry.last = now;
    submissionMap.set(ip, entry);
  } else {
    submissionMap.set(ip, { count: 1, last: now });
  }

  // Proxy to Formspree
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit form.' });
  }
}
