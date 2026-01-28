function ChartCard({ title, children }: any) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

export default ChartCard