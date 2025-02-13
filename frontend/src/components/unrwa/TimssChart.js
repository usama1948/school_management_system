import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimssChart = () => {
    const data = [
      { year: 2015, unrwa_avg: 60, jordan_avg: 70 },
      { year: 2016, unrwa_avg: 70, jordan_avg: 80 },
      { year: 2017, unrwa_avg: 80, jordan_avg: 90 },
    ];

  return (
    <div>
       <h3>نتائج اختبار TIMSS</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
                <Tooltip />
              <Legend />
                <Line type="monotone" dataKey="unrwa_avg" stroke="#8884d8" name="متوسط وكالة الغوث" />
                <Line type="monotone" dataKey="jordan_avg" stroke="#82ca9d" name="متوسط الأردن" />
            </LineChart>
       </ResponsiveContainer>
    </div>
  );
};

export default TimssChart;