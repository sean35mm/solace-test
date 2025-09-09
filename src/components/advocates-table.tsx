import type { Advocate } from '@/lib/types';

export default function AdvocatesTable({
  advocates,
}: {
  advocates: Advocate[];
}) {
  return (
    <table className='min-w-full border-collapse'>
      <thead className='bg-gray-50'>
        <tr>
          <th className='text-left px-3 py-2 border'>First Name</th>
          <th className='text-left px-3 py-2 border'>Last Name</th>
          <th className='text-left px-3 py-2 border'>City</th>
          <th className='text-left px-3 py-2 border'>Degree</th>
          <th className='text-left px-3 py-2 border'>Specialties</th>
          <th className='text-left px-3 py-2 border'>Years of Experience</th>
          <th className='text-left px-3 py-2 border'>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
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
              <td className='px-3 py-2 border'>{advocate.yearsOfExperience}</td>
              <td className='px-3 py-2 border'>{advocate.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
