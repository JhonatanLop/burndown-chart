import { useEffect, useMemo, useState } from 'react';
import { Issue } from '../components/Interfaces';
import { getIssues } from '../services/getIssues';
import BurndownChart from '../components/BurndownChart';
import { PointsCalculator } from '../services/PointsCalculator';
import { Chart } from 'chart.js';

export default function Svg() {
  const [svg, setSvg] = useState<string | null>(null);

  const [issues, setIssues] = useState<Issue[]>([]);
  const [optimalDistribution, setOptimalDistribution] = useState<number[]>([]);
  const [points, setPoints] = useState<number[]>([]);

  const generateSvg = (chart: Chart) => {
    setSvg(chart.toBase64Image());
  };

  const xlabel = useMemo(
    () => [
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '7',
      '8',
      '9',
      '10',
    ],
    [],
  );

  useEffect(() => {
    Promise.all([
      async () => {
        const issuesData = await getIssues();
        setIssues(issuesData);

        const totalPoints = issuesData.length;
        const poinstPerDay = totalPoints / xlabel.length;
        const distribution = [totalPoints];
        for (let i = 0; i < xlabel.length - 1; i++) {
          distribution.push(totalPoints - poinstPerDay * (i + 1));
        }

        setOptimalDistribution(distribution);
      },
    ]);
  }, [xlabel.length]);

  useEffect(() => {
    setPoints(PointsCalculator(issues, xlabel));
  }, [xlabel, issues]);

  return (
    <>
      {!!svg && !!svg.length ? (
        <img src={svg} alt="Burndown Chart SVG" />
      ) : (
        <BurndownChart
          labels={xlabel}
          distribution={optimalDistribution}
          points={points}
          overrideChartOptions={{
            responsive: false,
            maintainAspectRatio: false,
            animation: false,
          }}
          onRender={chart => generateSvg(chart)}
        />
      )}
    </>
  );
}
