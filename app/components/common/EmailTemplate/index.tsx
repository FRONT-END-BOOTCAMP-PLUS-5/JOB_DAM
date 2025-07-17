import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_PWD,
  },
});

export async function sendEmail(from: string, email: string, title: string, content: string, random: number) {
  const mailOptions = {
    to: email,
    subject: title,
    text: content,
    html: `
    <h1>${title}</h1>
    <div>${content}</div>
    </br>
    <p>보낸사람 : ${from}</p>
    <p>인증번호 : ${random}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
