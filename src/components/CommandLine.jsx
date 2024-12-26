'use client';
export function CommandLine({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(value)
    }
  }

  return (
    (<div className="flex items-center">
      <span className="mr-2 text-blue-300">$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none flex-1 text-white"
        autoFocus />
    </div>)
  );
}

