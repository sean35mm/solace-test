export default function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className='mt-6 overflow-x-auto animate-pulse'>
      <table className='min-w-full border-collapse'>
        <thead className='bg-gray-50'>
          <tr>
            {[...Array(7)].map((_, i) => (
              <th key={i} className='text-left px-3 py-2 border'>
                <div className='h-4 w-24 bg-gray-200 rounded' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, r) => (
            <tr key={r} className='odd:bg-white even:bg-gray-50'>
              {[...Array(7)].map((__, c) => (
                <td key={c} className='px-3 py-2 border'>
                  <div className='h-4 w-full bg-gray-200 rounded' />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
