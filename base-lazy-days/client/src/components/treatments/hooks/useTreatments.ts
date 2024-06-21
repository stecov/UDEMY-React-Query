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
    staleTime: 600000, // 10 mins
    gcTime: 900000, // 15 mins (doesnt make sense staleTime exceed gcTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
    staleTime: 600000, // 10 mins
    gcTime: 900000, // 15 mins (doesnt make sense staleTime exceed gcTime)
  })
}