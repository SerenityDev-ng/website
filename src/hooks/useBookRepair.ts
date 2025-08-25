"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import type { AxiosError } from "axios";

// Payload type for booking a repair service
export interface BookRepairPayload {
  repair_service: string; // repair_service_id
  service_time: {
    opening_time: string;
    closing_time: string;
  };
  service_address: {
    state: string;
    address: string;
    longitude: string | number;
    latitude: string | number;
  };
  payment_method: string;
  description?: string;
  gift_recipient_email?: string;
  // Optionally supported fields
  is_gift?: boolean;
  gift_sender?: string;
}

// Response type structure from backend
export interface BookRepairResponseData {
  _id: string;
  user: string;
  repair_service: string;
  service_address: Record<string, unknown>;
  service_time: Record<string, unknown>;
  payment_method: string;
  booking_status: string;
  total_amount: string;
  description: string;
  is_gift: boolean;
  gift_sender: string;
  payment_url: string;
}

export interface BookRepairResponse {
  data: BookRepairResponseData;
}

export type ApiError = {
  message?: string;
  errors?: unknown;
};

async function bookRepair(payload: BookRepairPayload): Promise<BookRepairResponse> {
  const res = await api.post("/api/repair_service/book_order", payload);
  return res.data as BookRepairResponse;
}

export function useBookRepair(
  options?: UseMutationOptions<BookRepairResponse, AxiosError<ApiError>, BookRepairPayload>
) {
  return useMutation<BookRepairResponse, AxiosError<ApiError>, BookRepairPayload>({
    mutationKey: ["book-repair"],
    mutationFn: bookRepair,
    ...options,
  });
}