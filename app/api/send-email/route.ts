import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { toEmail, installerName, capacity, phone, address } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject: `☀️ Solar Quote Requested: ${installerName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #111827;">Your Solar Quote Request is Confirmed! ☀️</h2>
          <p style="color: #4b5563; font-size: 16px;">You recently requested a quote for a <strong>${capacity} kW</strong> rooftop solar system.</p>
          <p style="color: #4b5563; font-size: 16px;">Here are the contact details for the installer you matched with. They will be reaching out to you shortly:</p>
          
          <div style="background: #fff7ed; padding: 20px; border-radius: 10px; border: 1px solid #fdba74; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #ea580c; font-size: 20px;">${installerName}</h3>
            <p style="color: #1f2937; margin: 5px 0;"><strong>📞 Phone:</strong> ${phone}</p>
            <p style="color: #1f2937; margin: 5px 0;"><strong>📍 Address:</strong> ${address}</p>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px;">Thank you for using Surya Setu AI to transition to clean energy!</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}