import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const parseCSV = (csvText) => {
  const rows = csvText.split('\n');
  const headers = rows[0].split(',');
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    data.push(obj);
  }
  
  return data;
};

export async function getServerSideProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');
    const csvText = fs.readFileSync(filePath, 'utf8');
    const data = parseCSV(csvText);

    return {
      props: {
        evData: data,
      },
    };
  } catch (error) {
    console.error('Failed to load data:', error);
    return {
      props: {
        evData: [],
        error: 'Failed to load data',
      },
    };
  }
}

export default function EVPage({ evData, error }) {
  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div>
      <h1>Electric Vehicle Population Data</h1>
      <pre>{JSON.stringify(evData, null, 2)}</pre>
    </div>
  );
}
