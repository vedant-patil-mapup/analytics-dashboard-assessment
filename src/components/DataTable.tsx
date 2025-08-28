interface Column<T> {
    key: keyof T;
    header: string;
}

interface DataTableProps<T extends { [key: string]: string | number }> {
    title: string;
    columns: Column<T>[];
    data: T[];
}

const DataTable = <T extends { [key: string]: string | number }>({ title, columns, data }: DataTableProps<T>) => {
    return (
        <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800">
                        <tr>
                            {columns.map((c) => (
                                <th key={String(c.key)} className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    {c.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-800">
                                {columns.map((c) => (
                                    <td key={String(c.key)} className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">
                                        {row[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;


