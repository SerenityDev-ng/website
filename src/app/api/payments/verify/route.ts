import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { status: "error", message: "Reference is required" },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment variables
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      console.error("Paystack secret key is not defined");
      return NextResponse.json(
        { status: "error", message: "Payment verification failed" },
        { status: 500 }
      );
    }

    // Verify payment with Paystack API
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // If verification is successful
    if (response.data.status && response.data.data.status === "success") {
      // Here you would typically update your database to mark the payment as successful
      // For example:
      // await db.transaction.update({
      //   where: { reference },
      //   data: { status: "completed", paidAt: new Date() }
      // });

      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data: response.data.data,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Payment verification failed",
        data: response.data.data,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { status: "error", message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
