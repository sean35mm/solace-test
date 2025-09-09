export default function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className='mt-6 overflow-x-auto'>
      <div className='rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse'>
        <table className='min-w-full border-collapse'>
          <thead className='bg-gray-50'>
            <tr>
              {[...Array(7)].map((_, i) => (
                <th key={i} className='text-left px-4 py-3 border-b'>
                  <div className='h-4 w-24 bg-gray-200 rounded' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, r) => (
              <tr key={r} className={r % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {[...Array(7)].map((__, c) => (
                  <td key={c} className='px-4 py-3 border-b'>
                    <div className='h-4 w-full bg-gray-200 rounded' />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
