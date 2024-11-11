// src/components/Chart.tsx
import React from 'react';
import BurndownChart from '../components/BurndownChart';
import { Issue } from '../interfaces/Interfaces';
import { PointsCalculator } from '../services/PointsCalculator';

interface ChartProps {
    issues: Issue[];
    xlabel: string[];
    optimalDistribution: number[];
}

const Chart: React.FC<ChartProps> = ({ issues, xlabel, optimalDistribution }) => {
    const points = PointsCalculator(issues, xlabel);

    return (
        <div className='chart'>
            <BurndownChart
                labels={xlabel}
                distribution={optimalDistribution}
                points={points}
            />
        </div>
    );
};

export default Chart;
