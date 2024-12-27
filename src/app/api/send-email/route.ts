import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Zoho",
    host: "smtppro.zoho.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // console.log(
  //   "Email credentials",
  //   process.env.EMAIL_USER,
  //   process.env.EMAIL_PASS
  // );
  try {
    await transporter.sendMail({
      from: "support@serenity.ng",
      to,
      subject,
      html,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
