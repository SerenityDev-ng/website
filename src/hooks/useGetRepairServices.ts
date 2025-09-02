"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import type { AxiosError } from "axios";

// Types for repair services
export interface RepairService {
  _id: string;
  user?: string;
  service_type: string;
  description: string;
  price: string;
  category: string;
  availability?: boolean;
}

export interface GetRepairServicesResponse {
  data: RepairService[];
}

export interface GetRepairServicesParams {
  category?: string;
  service_type?: string;
}

export type ApiError = {
  message?: string;
  errors?: unknown;
};

// Function to fetch repair services from API
async function getRepairServices(params?: GetRepairServicesParams): Promise<GetRepairServicesResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.category) {
    searchParams.append('category', params.category);
  }
  
  if (params?.service_type) {
    searchParams.append('service_type', params.service_type);
  }
  
  const url = `/api/repair_service${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await api.get(url);
  return res.data as GetRepairServicesResponse;
}

// Custom hook for fetching repair services
export function useGetRepairServices(
  params?: GetRepairServicesParams,
  options?: UseQueryOptions<GetRepairServicesResponse, AxiosError<ApiError>>
) {
  return useQuery<GetRepairServicesResponse, AxiosError<ApiError>>({
    queryKey: ["repair-services", params],
    queryFn: () => getRepairServices(params),
    ...options,
  });
}