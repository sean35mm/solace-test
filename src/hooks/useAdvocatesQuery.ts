import { useQuery } from '@tanstack/react-query';
import type { Advocate } from '@/lib/types';

type AdvocatesResponse = { data: Advocate[] };

export function useAdvocatesQuery() {
  return useQuery<AdvocatesResponse, Error>({
    queryKey: ['advocates'],
    queryFn: async () => {
      const response = await fetch('/api/advocates');
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
      return response.json();
    },
    staleTime: 60_000,
  });
}
