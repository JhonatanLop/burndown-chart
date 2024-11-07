// src/components/ChartComponent.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

interface ChartComponentProps {
  labels: string[];
  data: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData: ChartData = {
      labels,
      datasets: [
        {
          label: 'Sprint Points',
          data,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    return () => chartInstance.destroy();
  }, [labels, data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
