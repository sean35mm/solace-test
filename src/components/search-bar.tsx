type Props = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

export default function SearchBar({ query, onChange, onReset }: Props) {
  return (
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
          onClick={onReset}
          className='border rounded px-3 py-1 text-sm'
        >
          Reset Search
        </button>
      </div>
    </div>
  );
}
