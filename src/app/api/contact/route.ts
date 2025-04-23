import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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