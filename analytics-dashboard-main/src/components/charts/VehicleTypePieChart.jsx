import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import "../../App.css"


const COLORS = ['#0088FE', '#00C49F'];

const VehicleTypePieChart = ({ title,data }) => (
  <div>
    <h3>{title}</h3>
    <PieChart width={400} height={400}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={150} label={({type}) => `${type}`} dataKey="count" nameKey="type">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip/>
    </PieChart>
  </div>
);

export default VehicleTypePieChart;
