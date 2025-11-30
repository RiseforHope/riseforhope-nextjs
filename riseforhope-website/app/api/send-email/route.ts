import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // 1. Check API Key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY in Vercel Settings");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, message } = body;

    console.log("Attempting to send email from:", "info@riseforhope.org");
    console.log("Attempting to send email to:", "bladimirgarcia@gmail.com");

    // 2. Send Email
    const data = await resend.emails.send({
      from: 'info@riseforhope.org', // Your verified domain
      to: 'bladimirgarcia@gmail.com', // Your personal email
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    // 3. Check for Resend API Errors (The Secret Killer)
    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json({ success: false, error: data.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
