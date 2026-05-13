import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";



function RevenueChart({
  stats
}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      rounded-4
      p-4
      mt-4
      "
    >

      <h4 className="fw-bold mb-4">
        Revenue Analytics
      </h4>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={
            stats?.monthlyRevenue || []
          }
        >

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#f0b90b"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;