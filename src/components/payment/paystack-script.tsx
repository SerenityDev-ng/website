"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export function PaystackScript() {
  useEffect(() => {
    // Check if the script is already loaded
    if (document.getElementById("paystack-script")) {
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    
    // Append script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script if component unmounts
      const existingScript = document.getElementById("paystack-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
