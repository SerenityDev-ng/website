"use client";

import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import type { AxiosError } from "axios";

export interface CleaningHouseTypes {
  data: {
    _id: string;
    user: string;
    house_type: string;
    house_title: string;
    rooms: string;
    toilets: string;
    living_rooms: string;
    monthly_price: string;
    onetime_price: string;
    quantity?: number;
    isDuplex: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    deepCleaning_price: string;
  }[];
}

// Payload type for creating a cleaning booking
export interface BookCleaningPayload {
  frequency: string; // e.g., "weekly", "monthly", "once"
  cleaning_time:
    | {
        opening_time: string; // HH:mm
        closing_time: string; // HH:mm
      }
    | Array<{
        opening_time: string; // HH:mm
        closing_time: string; // HH:mm
      }>; // API examples may accept an array of time windows
  house_type_id: string; // reference id for the selected house type
  cleaning_address: {
    state: string;
    address: string;
    longitude: string | number;
    latitude: string | number;
  };
  total_amount?: string | number; // optional if computed server-side
  payment_method: string; // e.g., "PAYMENT_GATEWAY"
  gift_recipient_email?: string;
  // Optional gift fields
  is_gift?: boolean;
  gift_sender?: string;
}

// Response type structure from backend (provided by user)
export interface BookCleaningResponseData {
  _id: string;
  user: string;
  frequency: string;
  house_type: Record<string, unknown>;
  cleaning_address: Record<string, unknown>;
  total_amount: string;
  booking_status: string;
  payment_method: string;
  is_gift: boolean;
  gift_sender: string;
  payment_url: string;
}

export interface BookCleaningResponse {
  data: BookCleaningResponseData;
}

export type ApiError = {
  message?: string;
  errors?: unknown;
};

async function bookCleaning(payload: BookCleaningPayload): Promise<BookCleaningResponse> {
  const res = await api.post("/api/cleaning_bookings/create-order", payload);
  return res.data as BookCleaningResponse;
}

export function useBookCleaning(
  options?: UseMutationOptions<BookCleaningResponse, AxiosError<ApiError>, BookCleaningPayload>
) {
  return useMutation<BookCleaningResponse, AxiosError<ApiError>, BookCleaningPayload>({
    mutationKey: ["book-cleaning"],
    mutationFn: bookCleaning,
    ...options,
  });
}

export const useGetHouseTypes = () => {
  return useQuery({
    queryKey: ["get:house-types"],
    queryFn: async () => {
      const response = await api.get(
        `/api/house_type/`
      );

      return response.data as CleaningHouseTypes;
    },
  });
};