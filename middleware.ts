import { NextRequest, NextResponse } from 'next/server';

// In-memory map for IP rate limiting (works for serverless/edge, but resets on cold start)
const downloadMap = new Map<string, { count: number; last: number }>();

// Limit: 3 downloads per IP per day
const DOWNLOAD_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';

  // Rate limit only for resume download
  if (url === '/Resume.pdf') {
    const now = Date.now();
    const entry = downloadMap.get(ip);
    if (entry && now - entry.last < WINDOW_MS) {
      if (entry.count >= DOWNLOAD_LIMIT) {
        return new NextResponse('Too many downloads from this IP. Try again later.', { status: 429 });
      }
      entry.count += 1;
      entry.last = now;
      downloadMap.set(ip, entry);
    } else {
      downloadMap.set(ip, { count: 1, last: now });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Resume.pdf'],
};
