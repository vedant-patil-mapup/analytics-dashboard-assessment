import Dashboard from "@/components/dashboard";

const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data-to-visualize/Electric_Vehicle_Population_Data.csv`, {
    cache: 'no-store',
  });
  const csvText = await res.text();

  const rows = csvText.split('\n');
  const headers = rows[0].split(',');
  const evData = rows.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });

  return evData;
};

export default async function DashboardPage() {
  const evData = await fetchData();

  return (
    <Dashboard evData={evData} />
  );
}
