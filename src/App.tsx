// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Issue } from './components/Interfaces';
import { getIssues } from './services/getIssues';
import BurndownChart from './components/BurndownChart';

const App: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [optimalDistribution, setOptimalDistribution] = useState<number[]>([]);

    const xlabel = ["21", "23", "25", "27", "29", "31", "2", "4", "6", "8", "10"];
    useEffect(() => {
        const loadIssues = async () => {
            const issuesData = await getIssues();
            setIssues(issuesData);

            const totalPoints = issuesData.length;
            const poinstPerDay = totalPoints / xlabel.length;
            const distribution = [totalPoints];
            for (let i = 0; i < xlabel.length - 1; i++) {
                distribution.push(totalPoints - poinstPerDay * (i + 1));
            }

            setOptimalDistribution(distribution);
        };

        loadIssues();
    }, []);


    return (
        <div>
            <h1>Issues do Repositório</h1>
            <div className='chart'>
                {/* <BurndownChart
                labels={xlabel}
                data={optimalDistribution} 
            /> */}
                {/* mostrando as issues */}
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            {issue.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;