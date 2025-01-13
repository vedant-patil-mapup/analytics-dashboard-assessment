import { useState } from "react";

const EVsByMakeTable = ({ makeData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "make",
    direction: "asc",
  });
  const rowsPerPage = 10;

  const totalPages = Math.ceil(makeData.length / rowsPerPage);

  const filteredData = makeData.filter((entry) =>
    entry.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        EVs by Make
      </h2>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by make..."
          className="w-full max-w-md px-4 py-2 border rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 text-lg py-3 cursor-pointer"
                onClick={() => handleSort("make")}
              >
                Make{" "}
                {sortConfig.key === "make" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 text-lg py-3 cursor-pointer"
                onClick={() => handleSort("count")}
              >
                Count{" "}
                {sortConfig.key === "count" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index} className="border-b bg-white hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {entry.make}
                </td>
                <td className="px-6 py-4">{entry.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default EVsByMakeTable;
