import { useEffect, useState } from 'react';
import { Issue } from '../components/Interfaces';
import { getIssues } from '../services/getIssues';
import BurndownChart from '../components/BurndownChart';
import { PointsCalculator } from '../services/PointsCalculator';

export default function Chart() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [optimalDistribution, setOptimalDistribution] = useState<number[]>([]);

  const xlabel = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '01', '02', '03', '04', '05', '06', '7', '8', '9', '10'];
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
  }, [xlabel.length]);

  console.log(issues);
  const points = PointsCalculator(issues, xlabel);

  return (
    <>
      <h1>Issues do Repositório</h1>
      <div className="chart">
        <BurndownChart
          labels={xlabel}
          distribution={optimalDistribution}
          points={points}
        />
      </div>
    </>
  );
}
