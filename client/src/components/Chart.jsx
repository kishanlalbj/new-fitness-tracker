import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data = [] }) => {
  console.log({ data });
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (data) {
      const res = data?.map((obj) => {
        return {
          ...obj,
          createdAt: moment(obj.createdAt).format("DD MMM, YYYY"),
        };
      });

      setChartData(res);
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: 400 }} className="mt-8">
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={500}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 4" /> */}
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="bmi" stroke="#82ca9d" />

          <Line type="monotone" dataKey="bodyFat" stroke="#c2613e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
