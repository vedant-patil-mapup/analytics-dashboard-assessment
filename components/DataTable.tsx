type Row = {
    "Model Year": string;
    Make: string;
    "Electric Vehicle Type": string;
    County: string;
    City: string;
};


function DataTable({ rows }: { rows: Row[] }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 overflow-auto">
            <h2 className="font-semibold mb-4">Sample Data</h2>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        {Object.keys(rows[0] || {}).map((k) => (
                            <th key={k} className="text-left p-2">{k}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-b">
                            {Object.values(r).map((v, j) => (
                                <td key={j} className="p-2">{v}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable