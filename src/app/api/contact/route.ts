import EmailTemplate from '@/components/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Resend } from 'resend';

// Allow 5 messages per IP per hour
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 3600,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const captchaSecret = process.env.HCAPTCHA_SECRET;
const sender = process.env.EMAIL_SENDER;
const recipient = process.env.EMAIL_RECIPIENT;

export type ContactFormRequestData = {
  name: string,
  subject: string,
  email: string,
  message: string,
  token: string
}

export async function POST(req: NextRequest) {
  const ip = ipAddress(req.headers);

  try {
    await rateLimiter.consume(ip);
  } catch {
    return errorResponse({ message: 'Too many messages. Try again later.' }, 429);
  }

  const body = await req.json();
  const { name, subject, email, message, token }: ContactFormRequestData = body;

  if (!name || !subject || !email || !message || !token) {
    return errorResponse({ message: 'Missing fields' }, 400);
  }
  if (!captchaSecret || !sender || !recipient) {
    return errorResponse({ message: 'Missing secret' }, 500);
  }

  let hCaptchaData = await checkHCaptchaToken(token);
  if (!hCaptchaData.success) {
    return errorResponse({ message: 'Failed to verify hCaptcha token', response: hCaptchaData }, 500);
  }

  return await sendMail(
    sender,
    recipient,
    subject,
    name,
    email,
    message
  )
}

function errorResponse(error: object, status: number) {
  return NextResponse.json(
    { error: error },
    { status: status }
  )
}

function ipAddress(headers: Headers) {
  return (headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
}

async function checkHCaptchaToken(token: string) {
  const hCaptchaRes = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `response=${token}&secret=${captchaSecret}`,
  });
  return await hCaptchaRes.json();
}

async function sendMail(sender: string, recipient: string, subject: string, name: string, email: string, message: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      subject: subject,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return errorResponse({ message: 'Email failed to send', response: error }, 500);
    }
    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse({ message: 'Email failed to send', response: error }, 500);
  }
}