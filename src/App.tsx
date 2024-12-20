// src/App.tsx
import { useEffect, useState } from 'react';
import { Issue } from './interfaces/Interfaces';
import { getIssues } from './services/Issues';
import { getDistributionPoints } from './services/PointsCalculator';
import Chart from './pages/Chart';

const App: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [optimalDistribution, setOptimalDistribution] = useState<number[]>([]);

    const xlabel = ["11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","01"];
    
    useEffect(() => {
        const loadIssues = async () => {
            const issuesData = await getIssues();
            setIssues(issuesData);
            const distribution = getDistributionPoints(issuesData, xlabel.length);
            setOptimalDistribution(distribution);
        };

        loadIssues();
    }, [xlabel.length]);

    return (
        <div>
            <h1>Issues do Repositório</h1>
            <Chart
                issues={issues}
                xlabel={xlabel}
                optimalDistribution={optimalDistribution}
            />
        </div>
    );
};

export default App;