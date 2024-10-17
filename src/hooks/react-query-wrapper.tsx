"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useTokenExpiryCheck } from "./expiry-time";

const queryClient = new QueryClient();

export default function ReactQueryWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useTokenExpiryCheck();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
