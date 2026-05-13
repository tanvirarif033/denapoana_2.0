import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts";



function SalesChart({
  salesData = []
}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      rounded-4
      p-4
      "
    >

      <h4
        className="
        fw-bold
        mb-4
        "
      >
        Monthly Sales
      </h4>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={salesData}
        >

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#f59e0b"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;