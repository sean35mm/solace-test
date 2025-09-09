'use client';

import { useState } from 'react';
import { useAdvocatesQuery } from '@/hooks/useAdvocatesQuery';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import AdvocatesTable from '@/components/advocates-table';
import TableSkeleton from '@/components/table-skeleton';
import SearchBar from '@/components/search-bar';

export default function Home() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const debouncedQuery = useDebouncedValue(query, 300);
  const { data, isLoading, error } = useAdvocatesQuery({
    q: debouncedQuery,
    page,
    pageSize,
    sort: 'lastName',
    order: 'asc',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const onReset = () => {
    setQuery('');
    setPage(1);
  };

  const total = data?.total ?? 0;
  const advocates = data?.data ?? [];
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize + (advocates.length > 0 ? 1 : 0);
  const endIndex = (page - 1) * pageSize + advocates.length;

  return (
    <main className='m-6'>
      <h1 className='text-2xl font-semibold'>Solace Advocates</h1>
      <SearchBar query={query} onChange={onChange} onReset={onReset} />

      {isLoading && <TableSkeleton rows={10} />}
      {error && !isLoading && (
        <p className='mt-6 text-red-600'>{error.message}</p>
      )}
      {!isLoading && !error && advocates.length === 0 && (
        <p className='mt-6 text-gray-600'>No results found.</p>
      )}

      {!isLoading && !error && advocates.length > 0 && (
        <div className='mt-6 overflow-x-auto'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='text-sm text-gray-700'>
              {startIndex}-{endIndex} of {total}
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='border rounded px-3 py-1 text-sm disabled:opacity-50'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
              >
                Prev
              </button>
              <span className='text-sm text-gray-700'>
                Page {page} of {maxPage}
              </span>
              <button
                type='button'
                className='border rounded px-3 py-1 text-sm disabled:opacity-50'
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page >= maxPage || isLoading}
              >
                Next
              </button>
            </div>
          </div>
          <AdvocatesTable
            key={`${page}-${debouncedQuery}`}
            advocates={advocates}
          />
        </div>
      )}
    </main>
  );
}
