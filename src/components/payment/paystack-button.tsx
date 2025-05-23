"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define custom props without extending ButtonProps to avoid type conflicts
interface PaystackButtonProps extends Omit<ButtonProps, "onClick" | "onError"> {
  amount: number; // Amount in kobo (e.g., 10000 for ₦100)
  email: string;
  reference?: string;
  metadata?: Record<string, any>;
  onSuccess?: (reference: string) => void;
  onError?: (error: Error) => void;
}

export function PaystackButton({
  amount,
  email,
  reference,
  metadata = {},
  onSuccess,
  onError,
  children,
  disabled,
  className,
  ...props
}: PaystackButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Check if PaystackPop is available
      if (typeof window === "undefined" || !window.PaystackPop) {
        throw new Error("Paystack SDK not loaded");
      }

      // Generate a reference if not provided
      const paymentReference = reference || `ref-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount,
        ref: paymentReference,
        metadata: {
          ...metadata,
          email,
        },
        callback: (response: any) => {
          setIsLoading(false);
          if (onSuccess) {
            onSuccess(response.reference);
          }
          // Redirect to callback page
          router.push(`/callback/payment?reference=${response.reference}`);
        },
        onClose: () => {
          setIsLoading(false);
          toast.info("Payment cancelled");
        },
      });

      handler.openIframe();
    } catch (error) {
      setIsLoading(false);
      console.error("Payment error:", error);
      toast.error("Failed to initialize payment");
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
