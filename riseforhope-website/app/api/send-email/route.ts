import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Clients
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'bladimir.garcia@brinl.com';
const SENDER_EMAIL = 'info@riseforhope.org';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    // Validate
    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // 2. Save to Supabase
    const { error: dbError } = await supabase
        .from('form_submissions')
        .insert([
          {
            full_name: name,
            email: email,
            phone: phone || null,
            submission_type: type || 'general',
            message_body: message,
            status: 'new',
          }
        ]);

    if (dbError) {
      console.error('Supabase Error:', dbError.message);
    }

    // --- DETERMINE USER EMAIL CONTENT ---
    let userSubject = 'We received your message - Rise for Hope';
    let userMessageBody = '';

    // A. Heartwarming Message for Families
    if (type === 'family') {
      userSubject = 'Rise for Hope is here for you';
      userMessageBody = `
            <p>We want you to know that you are not walking this path alone.</p>
            <p>We have received your request for support. We know that reaching out takes courage, and we are honored that you entrusted us with your family's story.</p>
            <p>Our team is currently reviewing the details you shared so we can understand how best to wrap our arms around you during this season. A member of our Care Team will be in touch with you very soon.</p>
        `;
    }
    // B. Standard Message for Volunteers/Partners/Donors
    else {
      userMessageBody = `
            <p>We have successfully received your inquiry regarding <strong>${type || 'Rise for Hope'}</strong>.</p>
            <p>We are so grateful for your interest in joining our mission. Our team reviews every message carefully, and we will be in touch with you shortly to discuss next steps.</p>
        `;
    }

    // 3. Send Both Emails
    await Promise.all([
      // Email A: Notification to YOU (Admin)
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [ADMIN_EMAIL],
        replyTo: email,
        subject: `New Submission: ${type ? type.toUpperCase() : 'INQUIRY'} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
            <div style="background: #fff; padding: 20px; border-radius: 8px;">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">New ${type} Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #333; margin-top: 20px;">
                <strong>Message:</strong><br/>
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
          </div>
        `
      }),

      // Email B: Confirmation to USER
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [email],
        subject: userSubject,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; letter-spacing: 0.01em; line-height: 1.6;">
            <h2 style="color: #1a1a1a;">Hi ${name.split(' ')[0]},</h2>
            ${userMessageBody}
            <br>
            <p>We are with you,<br>
            <strong>Rise for Hope Team</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #888; letter-spacing: 0;">This is an automated message. Please do not reply directly to this email. For help, please email care@riseforhope.org.</p>
          </div>
        `,
      })
    ]);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}