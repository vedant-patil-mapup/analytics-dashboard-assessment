import { GrowthCharts } from './charts/GrowthCharts';

export const Header = ({ data }) => (
  <div className="flex flex-col items-start justify-between mb-8">
    <div className="flex items-center justify-between w-full mb-4">
      <h1 className="text-4xl font-extrabold text-blue-600 flex items-center">
        Growth Chart (Yearly Data)
      </h1>
    </div>

    {data && data.byYear && (
      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <GrowthCharts data={data.byYear} />
      </div>
    )}
  </div>
);
