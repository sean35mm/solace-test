import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Advocate } from '@/lib/types';

export type AdvocatesResponse = {
  data: Advocate[];
  total: number;
  page: number;
  pageSize: number;
  sort?: string;
  order?: 'asc' | 'desc';
};

export function useAdvocatesQuery(params?: {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.set('q', params.q);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  if (params?.sort) searchParams.set('sort', params.sort);
  if (params?.order) searchParams.set('order', params.order);
  const qs = searchParams.toString();

  return useQuery<AdvocatesResponse, Error>({
    queryKey: ['advocates', params],
    queryFn: async () => {
      const response = await fetch(`/api/advocates${qs ? `?${qs}` : ''}`);
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
      return response.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
