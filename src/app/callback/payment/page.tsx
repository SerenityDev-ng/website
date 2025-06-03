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
          <p className="text-center text-sm text-muted-foreground pt-2">
            A receipt has been sent to your email address.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="button-grad w-full"
            onClick={() => router.push("/services/cleaning")}
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
