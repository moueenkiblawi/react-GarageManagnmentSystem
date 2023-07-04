import React, { useEffect, useState } from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import '../../styles/chart.css';

const Chart = () => {
  const [data, setData] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/totalSalary/${year}`);
        const data = response.data;
        const last6MonthsData = data.slice(-6); // Get the last 6 months of data
        setData(last6MonthsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [year]);

  const getMonthName = (monthNumber) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  };

  return (
    <div className="chart">
      <p className="chart-title">Last 6 Months (Revenue)</p>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="gray"
            tickFormatter={monthNumber => getMonthName(monthNumber)}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <Tooltip />
          <Area type="monotone" dataKey="totalSales" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
