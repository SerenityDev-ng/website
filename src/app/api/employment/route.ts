import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmploymentFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  state: string;
  referralSources: string[];
  otherReferral?: string;
  coverLetter: string;
  references: {
    name: string;
    title: string;
    email: string;
    phone: string;
    relationship: string;
  }[];
  certificationTitle?: string;
  certificationDate?: string;
  resumeUrl?: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const streetAddress = formData.get('streetAddress') as string;
    const streetAddress2 = formData.get('streetAddress2') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const referralSourcesStr = formData.get('referralSources') as string;
    const otherReferral = formData.get('otherReferral') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const referencesStr = formData.get('references') as string;
    const certificationTitle = formData.get('certificationTitle') as string;
    const certificationDate = formData.get('certificationDate') as string;
    const resumeFile = formData.get('resume') as File;
    
    // Parse JSON strings
    const referralSources = referralSourcesStr ? JSON.parse(referralSourcesStr) : [];
    const references = referencesStr ? JSON.parse(referencesStr) : [];
    
    const employmentData: EmploymentFormData = {
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      streetAddress2,
      city,
      state,
      referralSources,
      otherReferral,
      coverLetter,
      references,
      certificationTitle,
      certificationDate
    };

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "streetAddress",
      "city",
      "state",
      "coverLetter",
    ];
    const missingFields = requiredFields.filter(
      (field) => !employmentData[field as keyof EmploymentFormData]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate at least one reference
    if (!employmentData.references || employmentData.references.length === 0) {
      return NextResponse.json(
        { error: "At least one reference is required" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (employmentData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employmentData.email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }
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

    // Generate HTML email for company
    const companyEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; margin-bottom: 10px;">Serenity Services</h1>
          <p style="color: #666; font-size: 16px;">New Employment Application</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 15px;">Applicant Information</h2>
          <p><strong>Name:</strong> ${employmentData.firstName} ${employmentData.lastName}</p>
          <p><strong>Phone:</strong> ${employmentData.phone}</p>
          ${employmentData.email ? `<p><strong>Email:</strong> ${employmentData.email}</p>` : ''}
          <p><strong>Address:</strong> ${employmentData.streetAddress}${employmentData.streetAddress2 ? `, ${employmentData.streetAddress2}` : ''}, ${employmentData.city}, ${employmentData.state}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">How they found us:</h3>
          <p>${employmentData.referralSources.join(', ')}${employmentData.otherReferral ? ` - ${employmentData.otherReferral}` : ''}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">Cover Letter:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${employmentData.coverLetter}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">References:</h3>
          ${employmentData.references.map((ref, index) => `
            <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
              <p><strong>Reference ${index + 1}:</strong></p>
              <p><strong>Name:</strong> ${ref.name}</p>
              <p><strong>Title:</strong> ${ref.title}</p>
              <p><strong>Email:</strong> ${ref.email}</p>
              <p><strong>Phone:</strong> ${ref.phone}</p>
              <p><strong>Relationship:</strong> ${ref.relationship}</p>
            </div>
          `).join('')}
        </div>
        
        ${employmentData.certificationTitle ? `
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">Certification:</h3>
          <p><strong>Title:</strong> ${employmentData.certificationTitle}</p>
          ${employmentData.certificationDate ? `<p><strong>Date:</strong> ${employmentData.certificationDate}</p>` : ''}
        </div>
        ` : ''}
        
        <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1a1a1a; margin-bottom: 15px;">Resume:</h3>
          <p><strong>File:</strong> ${resumeFile ? resumeFile.name : 'No resume uploaded'}</p>
          ${resumeFile ? `<p><strong>Size:</strong> ${(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>` : ''}
          <p><em>Note: Resume file is attached to this email if uploaded.</em></p>
        </div>
      </div>
    `;

    // Prepare attachments
    const attachments = [];
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
        contentType: resumeFile.type,
      });
    }

    // Send email to company
    await transporter.sendMail({
      from: "support@serenity.ng",
      to: "support@serenity.ng",
      subject: `New Employment Application - ${employmentData.firstName} ${employmentData.lastName}`,
      html: companyEmailHtml,
      attachments: attachments,
    });

    // Send confirmation email to applicant (if email provided)
    if (employmentData.email) {
      const applicantEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; margin-bottom: 10px;">Serenity Services</h1>
            <p style="color: #666; font-size: 16px;">Employment Application Confirmation</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; margin-bottom: 15px;">Thank you for your application!</h2>
            <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
              Dear ${employmentData.firstName},
            </p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
              We have received your employment application and our HR team will review it shortly. 
              You can expect to hear from us within 5-7 business days regarding the next steps.
            </p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e6e6e6; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1a1a1a; margin-bottom: 15px;">What happens next?</h3>
            <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
              <li>Our HR team will review your application and qualifications</li>
              <li>We'll contact your references if you advance to the next stage</li>
              <li>You'll receive an email or call within 5-7 business days</li>
              <li>If selected, we'll schedule an interview</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e6e6e6;">
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
              If you have any questions, please contact us at support@serenity.ng
            </p>
            <p style="color: #666; font-size: 14px;">
              Thank you for your interest in joining Serenity Services!
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: "support@serenity.ng",
        to: employmentData.email,
        subject: "Employment Application Confirmation - Serenity Services",
        html: applicantEmailHtml,
      });
    }

    return NextResponse.json(
      {
        message: "Employment application submitted successfully",
        data: {
          applicationId: `APP-${Date.now()}`,
          applicantName: `${employmentData.firstName} ${employmentData.lastName}`,
          estimatedResponse: "5-7 business days",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing employment application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}