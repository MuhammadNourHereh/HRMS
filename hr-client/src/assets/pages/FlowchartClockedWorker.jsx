import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';  // For Bar Chart
import { Chart as ChartJS } from 'chart.js/auto'; // Auto register components

// Function to calculate time difference in hours
const calculateTimeDifference = (clockOutTime) => {
  const clockOutDate = new Date(clockOutTime);
  const currentDate = new Date();
  const timeDifference = currentDate - clockOutDate; // Time in milliseconds
  const timeInHours = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
  return timeInHours;
};

function FlowchartClockedWorker() {
  const [clockedWorkersData, setClockedWorkersData] = useState([]);
  const [barChartData, setBarChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});

  // Fetch clocked workers data
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clocked-workers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Clocked Workers Data:', data);
        setClockedWorkersData(data);

        // Calculate average time for each worker
        const avgTimeData = data.map((worker) => {
          const timeDiff = calculateTimeDifference(worker.clock_out_time); // Calculate time difference
          return { 
            name: `${worker.employee.first_name} ${worker.employee.last_name}`, 
            avgTime: timeDiff,
            salary: worker.employee.salary,
          };
        });

        // Data for the Line Chart - average time per worker
        const lineData = {
          labels: avgTimeData.map((worker) => worker.name),
          datasets: [
            {
              label: 'Average Time (hours)',
              data: avgTimeData.map((worker) => worker.avgTime),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: false,
            },
          ],
        };

        // Data for the Bar Chart - workers' salaries
        const barData = {
          labels: data.map((worker) => `${worker.employee.first_name} ${worker.employee.last_name}`),
          datasets: [
            {
              label: 'Salaries',
              data: data.map((worker) => worker.employee.salary),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
          ],
        };

        setLineChartData(lineData);
        setBarChartData(barData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Ensure chart data is set before rendering the charts
  if (!clockedWorkersData || clockedWorkersData.length === 0) {
    return <div>Loading...</div>; // Display loading message until data is available
  }

  return (
    <div className='container' >
      <h1>Clocked Workers Visualization</h1>
<div className='box'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2>Bar Chart - Workers' Salaries and Average Time</h2>
          <Bar
            data={barChartData}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
        </div>
              </div>
              </div>
    </div>
  );
}

export default FlowchartClockedWorker;
