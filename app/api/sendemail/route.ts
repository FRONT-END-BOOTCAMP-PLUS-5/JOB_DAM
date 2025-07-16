import { sendEmail } from '@/app/components/common/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const { from, email, title, content, random } = body;

  await sendEmail(from, email, title, content, random);

  return NextResponse.json({ message: '이메일이 성공적으로 보내졌습니다.' });
}
