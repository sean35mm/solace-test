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
    <main className='px-6 py-8'>
      <div className='max-w-6xl mx-auto'>
        <header>
          <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
            Solace Advocates
          </h1>
          <p className='mt-1 text-slate-600'>
            Search, sort, and browse our network of advocates.
          </p>
        </header>

        <div className='mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
          <SearchBar query={query} onChange={onChange} onReset={onReset} />
        </div>

        {isLoading && <TableSkeleton rows={10} />}
        {error && !isLoading && (
          <p className='mt-6 text-red-600'>{error.message}</p>
        )}
        {!isLoading && !error && advocates.length === 0 && (
          <p className='mt-6 text-slate-600'>No results found.</p>
        )}

        {!isLoading && !error && advocates.length > 0 && (
          <section className='mt-6 overflow-x-auto'>
            <div className='mb-3 flex items-center justify-between'>
              <div className='text-sm text-slate-700'>
                {startIndex}-{endIndex} of {total}
              </div>
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  className='rounded-md px-3 py-2 text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 shadow-sm'
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || isLoading}
                >
                  ← Prev
                </button>
                <span className='text-sm text-slate-700'>
                  Page {page} of {maxPage}
                </span>
                <button
                  type='button'
                  className='rounded-md px-3 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 shadow-sm'
                  onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                  disabled={page >= maxPage || isLoading}
                >
                  Next →
                </button>
              </div>
            </div>
            <AdvocatesTable
              key={`${page}-${debouncedQuery}`}
              advocates={advocates}
            />
          </section>
        )}
      </div>
    </main>
  );
}
