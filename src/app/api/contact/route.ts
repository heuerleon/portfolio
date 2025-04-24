import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Allow 5 messages per IP per hour
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 3600,
});

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: 'Too many messages. Try again later.' },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, subject, email, message, token } = body;

  if (!name || !subject || !email || !message || !token) {
    return NextResponse.json(
      { error: 'Missing fields' },
      { status: 400 }
    );
  }

  // const hCaptchaRes = await fetch('https://api.hcaptcha.com/siteverify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: `response=${token}&secret=secret`,
  // });

  // const hCaptchaData = await hCaptchaRes.json();
  // if (!hCaptchaData.success) {
  //   return NextResponse.json(
  //     { error: 'Captcha failed' },
  //     { status: 400 }
  //   );
  // }

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}