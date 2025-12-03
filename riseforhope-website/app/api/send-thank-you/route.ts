import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Config Check
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) console.error("❌ MISSING SUPABASE URL");
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) console.error("❌ MISSING SERVICE ROLE KEY");

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    console.log("👉 STARTING /api/send-thank-you");

    try {
        const body = await request.json();
        const { email, name, amount } = body;

        // Format Amount
        const amountFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        const dateFormatted = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());

        console.log("📝 Processing donation for:", email);

        // --- STEP A: Save to Supabase ---
        // ID for the receipt number
        const { data: insertedData, error: dbError } = await supabase
            .from('donors')
            .insert([{ email, full_name: name, amount_donated: amount }])
            .select(); // .select() returns the new row with the ID

        let receiptNum = "R4H-PENDING";

        if (dbError) {
            console.error('❌ SUPABASE ERROR:', dbError.message);
            // Fallback random number if DB fails, so email still sends
            receiptNum = "R4H-" + Math.floor(100000 + Math.random() * 900000);
        } else if (insertedData && insertedData.length > 0) {
            console.log('✅ SUPABASE SUCCESS');
            // FIX: Use the actual Database ID to make it sequential (e.g. 1005, 1006)
            // We add 1000 just to make it look like a "real" receipt number
            receiptNum = "R4H-" + (1000 + insertedData[0].id);
        }

        // --- STEP B: Send Receipt Email ---
        const { data, error: emailError } = await resend.emails.send({
            from: 'Rise for Hope <donations@riseforhope.org>',
            to: [email],
            subject: 'Your Rise for Hope Donation Receipt',
            html: `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Receipt</title>
  <style>
    /* Reset & Basics */
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f9f9f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1D1B1A; line-height: 1.6; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    
    /* Typography Updates */
    h1 { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; margin: 0; color: #1D1B1A; letter-spacing: 0.5px; } 
    p { margin: 0 0 15px 0; color: #1D1B1A; letter-spacing: 0.5px; }
    strong { color: #1D1B1A; }
    td { color: #1D1B1A; letter-spacing: 0.5px; }
    a { color: inherit; text-decoration: none; }

    /* Layout */
    .wrapper { width: 100%; table-layout: fixed; background-color: #f9f9f9; }
    .main-table { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
    .content-cell { padding: 40px 50px; }

    /* Header Pink Gradient */
    .gradient-header {
        height: 10px;
        width: 100%;
        background: linear-gradient(90deg, #FDCCF1 0%, #F8EDFB 100%);
    }

    /* Badge Style */
    .success-badge {
        display: inline-block;
        background-color: #ebfcf2;
        color: #37e581;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 8px 18px;
        border-radius: 50px;
        margin-top: 15px;
    }

    /* Button Style */
    .btn {
        display: inline-block;
        background: linear-gradient(90deg, #FDCCF1 0%, #F8EDFB 100%);
        color: #1D1B1A; 
        padding: 16px 40px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 1px;
        text-transform: uppercase;
        box-shadow: 0 4px 15px rgba(253, 204, 241, 0.4);
    }

    /* Details Box */
    .details-table {
        border-collapse: separate !important;
        border-spacing: 0;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #f0f0f0;
    }

    /* Footer Links */
    .footer-link {
        color: #888888;
        font-size: 12px;
        text-decoration: none;
        margin: 0 10px;
        font-weight: 600;
    }
    .footer-link:hover {
        color: #ffffff;
    }

    /* Mobile */
    @media screen and (max-width: 600px) {
      .content-cell { padding: 30px 20px !important; }
      .main-table { width: 100% !important; border-radius: 0 !important; }
      h1 { font-size: 24px !important; }
      .wrapper { padding-bottom: 0 !important; }
    }
  </style>
</head>
<body>

  <!-- Main Wrapper -->
  <center class="wrapper">
    
    <div style="height: 40px;"></div>
    
    <!-- White Card -->
    <table class="main-table" width="600" cellpadding="0" cellspacing="0">
      
      <tr>
          <td class="gradient-header"></td>
      </tr>

      <tr>
        <td align="center" style="padding: 40px 0 10px 0;">
          <a href="https://riseforhope.org" target="_blank">
            <img src="https://res.cloudinary.com/dvexnl19a/image/upload/v1764609683/logo-r4h-tree-blue_3x_q47uen.png" alt="Rise for Hope" width="120" style="display:block;">
          </a>
        </td>
      </tr>

      <tr>
        <td class="content-cell" align="center">
          
          <h1 style="font-size: 32px; margin: 0 0 10px 0; color: #1D1B1A;">Thank You, ${name.split(' ')[0] || 'Friend'}!</h1>
          
          <div style="margin-bottom: 5px;">
              <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; font-size: 54px; color: #1D1B1A;">${amountFormatted}</span>
          </div>

          <div class="success-badge">Donation Successful</div>
          
          <div style="height: 40px;"></div>

          <p style="text-align: left;">
            Thank you for being a light in dark seasons. Your gift brings immediate relief to families facing pediatric cancer, helping them cover everyday needs during an agonizing season of treatments and uncertainty.
          </p>

          <table class="details-table" width="100%" bgcolor="#f9f9f9" cellpadding="20" cellspacing="0" style="margin: 30px 0; text-align: left;">
            <tr>
              <td>
                <p style="margin: 0 0 15px 0; font-size: 11px; color: #1D1B1A; text-transform: uppercase; letter-spacing: 2px; font-weight: 800;">Receipt Details</p>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 15px; padding-bottom: 8px;">Donor Name</td>
                    <td align="right" style="font-size: 15px; font-weight: bold;">${name || 'Friend'}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; padding-bottom: 8px;">Date</td>
                    <td align="right" style="font-size: 15px; font-weight: bold;">${dateFormatted}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; padding-bottom: 8px;">Receipt #</td>
                    <td align="right" style="font-size: 15px; font-weight: bold;">${receiptNum}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; padding-bottom: 8px;">Method</td>
                    <td align="right" style="font-size: 15px; font-weight: bold;">Online / Card</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px; padding-top: 12px; border-top: 1px dashed #ccc;"><strong>Total Donation</strong></td>
                    <td align="right" style="font-size: 15px; font-weight: bold; padding-top: 12px; border-top: 1px dashed #ccc;">${amountFormatted}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <div style="height: 20px;"></div>

          <a href="https://riseforhope.org" class="btn">Return to Website</a>

        </td>
      </tr>
      <!-- Closed Main Table here to separate footer -->
    </table>
    
    <div style="height: 40px;"></div>

    <!-- Full Width Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1D1B1A">
        <tr>
            <td align="center" style="padding: 50px 20px;">
                <p style="font-size: 12px; color: #888; margin: 0 0 20px 0; line-height: 1.6; letter-spacing: 0.5px;">
                    <strong>Rise for Hope</strong><br>
                    A registered 501(c)(3) nonprofit organization.<br>
                    No goods or services were provided in exchange for this contribution.<br>
                    EIN: 33-4151218
                </p>
                <div>
                    <a href="mailto:contact@riseforhope.org" class="footer-link">Contact Us</a>
                    <span style="color: #444;">|</span>
                    <a href="#" class="footer-link">Unsubscribe</a>
                </div>
            </td>
        </tr>
    </table>

  </center>

</body>
</html>
            `
        });

        if (emailError) {
            console.error('❌ RESEND ERROR:', emailError);
            return NextResponse.json({ error: emailError }, { status: 500 });
        }

        console.log('✅ EMAIL SENT SUCCESSFULLY:', data);
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('💥 CRITICAL API CRASH:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}