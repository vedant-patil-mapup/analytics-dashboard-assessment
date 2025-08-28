import React, { useMemo } from 'react';

interface FiltersProps {
    makes: string[];
    types: string[];
    years: number[];
    value: { make?: string; type?: string; yearMin?: number; yearMax?: number };
    onChange: (next: { make?: string; type?: string; yearMin?: number; yearMax?: number }) => void;
}

const Filters: React.FC<FiltersProps> = ({ makes, types, years, value, onChange }) => {
    const minYear = useMemo(() => (years.length ? Math.min(...years) : undefined), [years]);
    const maxYear = useMemo(() => (years.length ? Math.max(...years) : undefined), [years]);

    return (
        <div className="bg-gray-900 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 md:items-end border border-gray-800">
            <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">Make</label>
                <select
                    className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md p-2"
                    value={value.make ?? ''}
                    onChange={(e) => onChange({ ...value, make: e.target.value || undefined })}
                >
                    <option value="">All</option>
                    {makes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">Type</label>
                <select
                    className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md p-2"
                    value={value.type ?? ''}
                    onChange={(e) => onChange({ ...value, type: e.target.value || undefined })}
                >
                    <option value="">All</option>
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">Year Min</label>
                <input
                    type="number"
                    className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md p-2"
                    placeholder={minYear?.toString()}
                    value={value.yearMin ?? ''}
                    onChange={(e) => onChange({ ...value, yearMin: e.target.value ? Number(e.target.value) : undefined })}
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">Year Max</label>
                <input
                    type="number"
                    className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md p-2"
                    placeholder={maxYear?.toString()}
                    value={value.yearMax ?? ''}
                    onChange={(e) => onChange({ ...value, yearMax: e.target.value ? Number(e.target.value) : undefined })}
                />
            </div>
            <div>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700 rounded-md px-4 py-2"
                    onClick={() => onChange({})}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filters;


