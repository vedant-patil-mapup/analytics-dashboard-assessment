import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
