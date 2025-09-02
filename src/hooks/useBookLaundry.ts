"use client";

import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
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

// Types for fetching laundry services
export type LaundryType = "WASHED_FOLDED" | "IRONED" | "WASHED_IRONED";

export interface LaundryService {
  _id: string;
  user?: string;
  laundry_type: string;
  wear: string;
  price: string;
  customer_type: string;
}

export interface GetLaundryServicesResponse {
  data: LaundryService[];
}

export interface GetLaundryServicesParams {
  laundry_type?: LaundryType;
}

async function getLaundryServices(params?: GetLaundryServicesParams): Promise<GetLaundryServicesResponse> {
  const searchParams = new URLSearchParams();
  if (params?.laundry_type) {
    searchParams.append('laundry_type', params.laundry_type);
  }
  
  const url = `/api/laundry${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await api.get(url);
  return res.data as GetLaundryServicesResponse;
}

export function useGetLaundryServices(
  params?: GetLaundryServicesParams,
  options?: UseQueryOptions<GetLaundryServicesResponse, AxiosError<ApiError>>
) {
  return useQuery<GetLaundryServicesResponse, AxiosError<ApiError>>({
    queryKey: ["laundry-services", params],
    queryFn: () => getLaundryServices(params),
    ...options,
  });
}