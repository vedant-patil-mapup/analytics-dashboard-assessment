function Card({ title, value }: any) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
    );
}

export default Card