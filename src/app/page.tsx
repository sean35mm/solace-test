'use client';

import { useState } from 'react';
import type { Advocate } from '@/lib/types';
import { useAdvocatesQuery } from '@/hooks/useAdvocatesQuery';

export default function Home() {
  const [query, setQuery] = useState('');

  const { data, isLoading, error } = useAdvocatesQuery();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    const normalized = searchTerm.trim().toLowerCase();
    const source: Advocate[] = data?.data ?? [];
    if (!normalized) {
      return;
    }
    const next = source.filter((advocate) => {
      const first = advocate.firstName.toLowerCase();
      const last = advocate.lastName.toLowerCase();
      const city = advocate.city.toLowerCase();
      const degree = advocate.degree.toLowerCase();
      const specialtiesJoined = advocate.specialties.join(' ').toLowerCase();
      const years = String(advocate.yearsOfExperience);
      const phone = String(advocate.phoneNumber);
      return (
        first.includes(normalized) ||
        last.includes(normalized) ||
        city.includes(normalized) ||
        degree.includes(normalized) ||
        specialtiesJoined.includes(normalized) ||
        years.includes(normalized) ||
        phone.includes(normalized)
      );
    });
    // no-op: filtering will be derived below; this handler only updates query
  };

  const onClick = () => {
    setQuery('');
  };

  const advocates: Advocate[] = data?.data ?? [];
  const normalized = query.trim().toLowerCase();
  const filteredAdvocates: Advocate[] = !normalized
    ? advocates
    : advocates.filter((advocate) => {
        const first = advocate.firstName.toLowerCase();
        const last = advocate.lastName.toLowerCase();
        const city = advocate.city.toLowerCase();
        const degree = advocate.degree.toLowerCase();
        const specialtiesJoined = advocate.specialties.join(' ').toLowerCase();
        const years = String(advocate.yearsOfExperience);
        const phone = String(advocate.phoneNumber);
        return (
          first.includes(normalized) ||
          last.includes(normalized) ||
          city.includes(normalized) ||
          degree.includes(normalized) ||
          specialtiesJoined.includes(normalized) ||
          years.includes(normalized) ||
          phone.includes(normalized)
        );
      });

  return (
    <main className='m-6'>
      <h1 className='text-2xl font-semibold'>Solace Advocates</h1>
      <div className='mt-6 space-y-2'>
        <label htmlFor='search' className='block text-sm font-medium'>
          Search
        </label>
        <p aria-live='polite' className='text-sm text-gray-600'>
          Searching for: <span>{query}</span>
        </p>
        <div className='flex items-center gap-2'>
          <input
            id='search'
            value={query}
            onChange={onChange}
            className='border border-gray-300 rounded px-2 py-1 w-64'
          />
          <button
            type='button'
            onClick={onClick}
            className='border rounded px-3 py-1 text-sm'
          >
            Reset Search
          </button>
        </div>
      </div>

      {isLoading && <p className='mt-6 text-gray-600'>Loading advocates…</p>}
      {error && !isLoading && (
        <p className='mt-6 text-red-600'>{error.message}</p>
      )}
      {!isLoading && !error && filteredAdvocates.length === 0 && (
        <p className='mt-6 text-gray-600'>No results found.</p>
      )}

      {!isLoading && !error && filteredAdvocates.length > 0 && (
        <div className='mt-6 overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left px-3 py-2 border'>First Name</th>
                <th className='text-left px-3 py-2 border'>Last Name</th>
                <th className='text-left px-3 py-2 border'>City</th>
                <th className='text-left px-3 py-2 border'>Degree</th>
                <th className='text-left px-3 py-2 border'>Specialties</th>
                <th className='text-left px-3 py-2 border'>
                  Years of Experience
                </th>
                <th className='text-left px-3 py-2 border'>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                const rowKey = `${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`;
                return (
                  <tr key={rowKey} className='odd:bg-white even:bg-gray-50'>
                    <td className='px-3 py-2 border'>{advocate.firstName}</td>
                    <td className='px-3 py-2 border'>{advocate.lastName}</td>
                    <td className='px-3 py-2 border'>{advocate.city}</td>
                    <td className='px-3 py-2 border'>{advocate.degree}</td>
                    <td className='px-3 py-2 border'>
                      {advocate.specialties.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </td>
                    <td className='px-3 py-2 border'>
                      {advocate.yearsOfExperience}
                    </td>
                    <td className='px-3 py-2 border'>{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
