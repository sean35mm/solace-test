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
      <p aria-live='polite' className='text-sm text-slate-600'>
        Searching for: <span>{query}</span>
      </p>
      <div className='flex items-center gap-2'>
        <input
          id='search'
          value={query}
          onChange={onChange}
          className='border border-slate-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 bg-white'
        />
        <button
          type='button'
          onClick={onReset}
          className='border border-slate-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-slate-50 active:bg-slate-100 shadow-sm text-slate-700'
        >
          Reset Search
        </button>
      </div>
    </div>
  );
}
