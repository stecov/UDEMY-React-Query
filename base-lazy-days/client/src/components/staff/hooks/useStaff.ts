import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// 53. Code Quiz! Selector for useStaff
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");
  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === 'all') return unfilteredStaff;
      return filterByTreatment(unfilteredStaff, filter)
    }, [filter]
  )

  // get data from server via useQuery
  const fallback: Staff[] = []
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn
  })


  return { staff, filter, setFilter };
}
