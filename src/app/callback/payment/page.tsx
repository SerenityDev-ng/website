"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

export default function PaystackCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Use toast directly from sonner

  // Payment status states
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | "pending"
  >("pending");
  const [transactionDetails, setTransactionDetails] = useState<{
    reference: string;
    amount: string;
    email: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);

        // Get reference from URL
        const reference = searchParams.get("reference");

        if (!reference) {
          setPaymentStatus("error");
          toast.error("Invalid payment reference");
          setIsLoading(false);
          return;
        }

        // Verify payment with your backend
        const response = await axios.post("/api/payments/verify", {
          reference,
        });

        if (response.data.status === "success") {
          setPaymentStatus("success");
          setTransactionDetails({
            reference: response.data.data.reference,
            amount: new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(response.data.data.amount / 100),
            email: response.data.data.customer.email,
            date: new Date(response.data.data.paid_at).toLocaleString(),
          });
        } else {
          setPaymentStatus("error");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus("error");
        toast.error("Failed to verify payment");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-league-spartan">
              Processing Payment
            </CardTitle>
            <CardDescription>
              Please wait while we verify your payment...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-10">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render success state
  if (paymentStatus === "success" && transactionDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <Card className="w-full max-w-md border-2 border-green-100 dark:border-green-900">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <CardTitle className="text-2xl font-league-spartan text-green-700 dark:text-green-500">
              Payment Successful!
            </CardTitle>
            <CardDescription>
              Your transaction has been completed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference:</span>
                <span className="font-medium">
                  {transactionDetails.reference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{transactionDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{transactionDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{transactionDetails.date}</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground pt-2">
              A receipt has been sent to your email address.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="button-grad w-full"
              onClick={() => router.push("/profile/bookings")}
            >
              View My Bookings
            </Button>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render error state
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md border-2 border-red-100 dark:border-red-900/30">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-red-100 dark:bg-red-900/30 p-3 rounded-full w-fit mb-4">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
          </div>
          <CardTitle className="text-2xl font-league-spartan text-red-700 dark:text-red-500">
            Payment Failed
          </CardTitle>
          <CardDescription>
            We couldn&apos;t process your payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-center">
              Your payment could not be processed. This could be due to
              insufficient funds, network issues, or the transaction was
              declined by your bank.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
