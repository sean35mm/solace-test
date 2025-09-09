import type { Advocate } from '@/lib/types';

export default function AdvocatesTable({
  advocates,
}: {
  advocates: Advocate[];
}) {
  return (
    <div className='rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white'>
      <table className='min-w-full border-collapse'>
        <thead className='bg-slate-50'>
          <tr>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              First Name
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              Last Name
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              City
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              Degree
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              Specialties
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              Years of Experience
            </th>
            <th className='text-left px-4 py-3 border-b text-slate-600 text-sm'>
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, idx) => {
            const rowKey = `${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`;
            return (
              <tr key={rowKey} className='odd:bg-white even:bg-slate-50'>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.firstName}
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.lastName}
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.city}
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.degree}
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  <div className='flex flex-wrap gap-1.5'>
                    {advocate.specialties.map((s) => (
                      <span
                        key={s}
                        className='inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200'
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.yearsOfExperience}
                </td>
                <td className='px-4 py-3 border-b align-middle h-12'>
                  {advocate.phoneNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
