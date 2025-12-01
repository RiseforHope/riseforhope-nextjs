import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, type } = body;

    // Determine Email Subject based on the 'type' sent from the form
    let subject = `New Message from ${name}`;
    if (type === 'volunteer') subject = `New Volunteer Application: ${name}`;
    if (type === 'donor') subject = `New Donor Inquiry: ${name}`;

    const data = await resend.emails.send({
      from: 'info@riseforhope.org', // Your verified domain
      to: 'bladimir.garcia@brinl.com', // Your Resend account email
      replyTo: email,
      subject: subject,
      html: `
        <h2>${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
          ${message}
        </blockquote>
      `,
    });

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
