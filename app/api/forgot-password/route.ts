import EmailTemplate from '@/app/components/email/ForgotPasswordTemplate';
import type { NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(res: NextApiResponse) {
  const { data, error } = await resend.emails.send({
    from: 'JOB담 <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    react: await EmailTemplate({ firstName: 'John' }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
