"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Sidebar from '../sidebar/page';

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const data = [
    { year: 2020, count: 10 },
    { year: 2021, count: 20 },
    { year: 2022, count: 15 },
    { year: 2023, count: 25 },

  ];

  useEffect(() => {
    const canvas = chartRef.current;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Initialize the new chart when the component mounts
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Sales by year',
            data: data.map((row) => row.count),
          },
        ],
      },
      
    });

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, chartRef]);

  return (
    <div>
    <Sidebar />
    <div className='flex items-center justify-center h-screen ml-[300px] '>
  <canvas className="w-64 h-64" ref={chartRef} width="400" height="200"></canvas>
  </div>
  </div>
)};

export default BarChart;