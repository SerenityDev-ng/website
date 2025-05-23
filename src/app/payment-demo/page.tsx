"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PaystackButton } from "@/components/payment/paystack-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters and convert to number
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value ? parseInt(value, 10) : 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!amount || amount < 100) {
      toast.error("Please enter a valid amount (minimum ₦100)");
      return;
    }
    
    // Form is valid, show payment button
    setIsLoading(true);
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-league-spartan text-center">
            Payment Demo
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to make a test payment with Paystack
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="1,000.00"
                  value={amount > 0 ? amount.toString() : ""}
                  onChange={handleAmountChange}
                  required
                />
                {amount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    You will pay: {formatAmount(amount)}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full button-grad">
                Proceed to Payment
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2 bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formatAmount(amount)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <PaystackButton
                  amount={amount * 100} // Convert to kobo
                  email={email}
                  className="w-full button-grad"
                  onSuccess={(reference) => {
                    toast.success("Payment initiated successfully");
                  }}
                  onError={(error) => {
                    toast.error("Payment initialization failed");
                    setIsLoading(false);
                  }}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay with Paystack
                </PaystackButton>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsLoading(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-xs text-muted-foreground text-center">
            This is a demo of the Paystack payment integration. No actual payment will be processed.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            After payment, you will be redirected to the payment callback page.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
