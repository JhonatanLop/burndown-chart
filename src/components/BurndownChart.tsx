// src/components/ChartComponent.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

interface ChartComponentProps {
  labels: string[];
  distribution: number[];
  points: number[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ labels, distribution, points }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData: ChartData = {
      labels,
      datasets: [
        {
          label: 'Distribution of Points ',
          data: distribution,
          backgroundColor: [
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(80, 80, 80, 80)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Points Left',
          data: points,
          backgroundColor: [
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
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
  }, [labels, distribution, points]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
