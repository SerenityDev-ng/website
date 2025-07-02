import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import LaundryOrderRequestEmail from "@/emails/laundry-order-request";
import nodemailer from "nodemailer";

interface LaundryOrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
  selectedService: {
    title: string;
  };
  orderSummary?: {
    mensItems?: { [key: string]: number };
    womensItems?: { [key: string]: number };
    childrensItems?: { [key: string]: number };
    extraItems?: { [key: string]: number };
    totalAmount: number;
  };
}

export async function POST(req: Request) {
  try {
    const laundryData: LaundryOrderData = await req.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "pickupDate",
      "pickupTime",
      "selectedService",
    ];
    const missingFields = requiredFields.filter(
      (field) => !laundryData[field as keyof LaundryOrderData]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(laundryData.email)) {
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
      LaundryOrderRequestEmail(laundryData)
    );

    // Send email to company
    await transporter.sendMail({
      from: "support@serenity.ng",
      to: "support@serenity.ng",
      subject: `New Laundry Order - ${laundryData.selectedService.title} - ${laundryData.firstName} ${laundryData.lastName}`,
      html: companyEmailHtml,
    });

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; margin-bottom: 10px;">Serenity Laundry Services</h1>
          <p style="color: #666; font-size: 16px;">Order Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 15px;">Thank you for your order!</h2>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            Dear ${laundryData.firstName},
          </p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            We have received your laundry order and our team will be at your location for pickup as scheduled. 
            You can expect our representative to arrive at your address on ${new Date(
              laundryData.pickupDate
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })} at ${laundryData.pickupTime}.
          </p>
          <div style="border-left: 4px solid #059669; padding-left: 15px; margin: 20px 0;">
            <p style="color: #333; margin-bottom: 5px;"><strong>Selected Service:</strong> ${laundryData.selectedService.title}</p>
            ${laundryData.orderSummary ? `<p style="color: #059669; font-weight: bold;">Total Amount: ₦${laundryData.orderSummary.totalAmount.toLocaleString()}</p>` : ""}
          </div>
        </div>
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">What happens next?</h3>
          <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
            <li>Our representative will arrive at your location at the scheduled time</li>
            <li>Your items will be collected and processed according to your selected service</li>
            <li>We'll clean and process your items with care</li>
            <li>Your freshly cleaned items will be delivered back to you within 48 hours</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e6e6e6;">
          <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
            If you have any questions, please contact us at support@serenity.ng
          </p>
          <p style="color: #666; font-size: 14px;">
            Thank you for choosing Serenity Laundry Services!
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "support@serenity.ng",
      to: laundryData.email,
      subject: "Laundry Order Confirmation - Serenity Laundry Services",
      html: customerEmailHtml,
    });

    return NextResponse.json(
      {
        message: "Laundry order submitted successfully",
        data: {
          orderId: `LDY-${Date.now()}`,
          customerName: `${laundryData.firstName} ${laundryData.lastName}`,
          service: laundryData.selectedService.title,
          pickupDate: new Date(laundryData.pickupDate).toLocaleDateString(),
          pickupTime: laundryData.pickupTime,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing laundry order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
