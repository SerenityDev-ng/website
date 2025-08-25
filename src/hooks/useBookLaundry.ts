"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import type { AxiosError } from "axios";

// Payload type for booking a laundry service
export interface BookLaundryPayload {
  laundry_order: Array<{
    laundry_id: string; // service id
    quantity: number;
  }>;
  laundry_time: {
    opening_time: string; // HH:mm
    closing_time: string; // HH:mm
  };
  payment_method: string; // e.g., "PAYMENT_GATEWAY"
  order_type: string; // e.g., "pickup" | "delivery"
  laundry_address: {
    state: string;
    address: string;
    longitude: string | number;
    latitude: string | number;
  };
  gift_recipient_email?: string;
  // Optionally supported fields
  is_gift?: boolean;
  gift_sender?: string;
}

// Response type structure from backend (normalized envelope)
export interface BookLaundryResponseData {
  _id: string;
  user: string;
  laundry_time: Record<string, unknown>;
  payment_method: string;
  booking_status: string;
  total_amount: string;
  order_type: string;
  laundry_address: Record<string, unknown>;
  is_gift: boolean;
  gift_sender: string;
  payment_url: string;
}

export interface BookLaundryResponse {
  data: BookLaundryResponseData;
}

export type ApiError = {
  message?: string;
  errors?: unknown;
};

async function bookLaundry(payload: BookLaundryPayload): Promise<BookLaundryResponse> {
  const res = await api.post("/api/laundry/book_laundry", payload);
  return res.data as BookLaundryResponse;
}

export function useBookLaundry(
  options?: UseMutationOptions<BookLaundryResponse, AxiosError<ApiError>, BookLaundryPayload>
) {
  return useMutation<BookLaundryResponse, AxiosError<ApiError>, BookLaundryPayload>({
    mutationKey: ["book-laundry"],
    mutationFn: bookLaundry,
    ...options,
  });
}