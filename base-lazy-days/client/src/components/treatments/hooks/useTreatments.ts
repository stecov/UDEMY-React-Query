import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Treatment } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // 39. Create empty Treatment Array for fallback
  const fallback: Treatment[] = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    // 55. Update Re-Fetch Options
    refetchOnMount: false,
    refetchOnReconnect: false
  })
  return data;
}


// 46. Pre-Fetching Treatments 
export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  // prefetch doesnt need refetch otions
  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  })
}