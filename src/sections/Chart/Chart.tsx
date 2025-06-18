import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import'./Chart.css'
const data = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 600 },
  { name: 'Apr', orders: 500 },
];

const SalesLineChart = () => {
  return (
    <div className="chart-container p-3 bg-white rounded-5">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#ffc107"
            name="Orders"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesLineChart;