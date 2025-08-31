import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import "../../App.css"


const GrowthLineChart = ({ title,data }) => (
  
  <div>
    <h3>{title}</h3>
    <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  </div>
);

export default GrowthLineChart;
