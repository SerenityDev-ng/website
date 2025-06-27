import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import RepairQuoteRequestEmail from "@/emails/repair-quote-request";
import nodemailer from "nodemailer";

interface RepairFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  state: string;
  postalCode: string;
  description: string;
  selectedService?: {
    id: number;
    title: string;
    price: number;
    text: string;
  };
  imageUrls?: string[];
}

export async function POST(req: Request) {
  try {
    const repairData: RepairFormData = await req.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "streetAddress",
      "city",
      "state",
      "postalCode",
      "description",
    ];
    const missingFields = requiredFields.filter(
      (field) => !repairData[field as keyof RepairFormData]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(repairData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

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

    // Generate HTML email using React Email
    const companyEmailHtml = await render(
      RepairQuoteRequestEmail({
        ...repairData,
        files: repairData.imageUrls || [],
      })
    );

    // Send email to company
    await transporter.sendMail({
      from: "support@serenity.ng",
      to: "support@serenity.ng",
      subject: `New Repair Quote Request - ${repairData.selectedService?.title || "General Repair"} - ${repairData.firstName} ${repairData.lastName}`,
      html: companyEmailHtml,
    });

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; margin-bottom: 10px;">Serenity Repair Services</h1>
          <p style="color: #666; font-size: 16px;">Quote Request Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 15px;">Thank you for your request!</h2>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            Dear ${repairData.firstName},
          </p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            We have received your repair quote request and our team will review it shortly. 
            You can expect to hear from us within 24 hours with a detailed quote and next steps.
          </p>
          ${
            repairData.selectedService
              ? `
          <div style="border-left: 4px solid #059669; padding-left: 15px; margin: 20px 0;">
            <p style="color: #333; margin-bottom: 5px;"><strong>Selected Service:</strong> ${repairData.selectedService.title}</p>
            <p style="color: #666; margin-bottom: 5px;">${repairData.selectedService.text}</p>
            <p style="color: #059669; font-weight: bold;">Estimated Price: ₦${repairData.selectedService.price.toLocaleString()}</p>
          </div>
          `
              : ""
          }
        </div>
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">What happens next?</h3>
          <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
            <li>Our team will review your request and service requirements</li>
            <li>We'll prepare a detailed quote based on your specific needs</li>
            <li>You'll receive a call or email within 24 hours</li>
            <li>Once approved, we'll schedule your repair service</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e6e6e6;">
          <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
            If you have any questions, please contact us at support@serenity.ng
          </p>
          <p style="color: #666; font-size: 14px;">
            Thank you for choosing Serenity Repair Services!
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "support@serenity.ng",
      to: repairData.email,
      subject: "Quote Request Confirmation - Serenity Repair Services",
      html: customerEmailHtml,
    });

    return NextResponse.json(
      {
        message: "Quote request submitted successfully",
        data: {
          requestId: `REQ-${Date.now()}`,
          customerName: `${repairData.firstName} ${repairData.lastName}`,
          service: repairData.selectedService?.title || "General Repair",
          estimatedResponse: "24 hours",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing repair quote request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
