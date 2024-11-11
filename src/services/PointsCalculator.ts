import { Issue } from "../interfaces/Interfaces";

function getPointsInDay(issues: Issue[], day: string, pointsAlreadyBurned: number): number {
    let points = pointsAlreadyBurned;
    issues.forEach(issue => {
        if (issue.closed_at) {
            const closedDate = issue.closed_at.split('T')[0];
            const closedDay = closedDate.slice(-2);
            if (closedDay === day) {
                points -= 1;
            }
        }
    });

    return points;
}

function getDistributionPoints(issues:Issue[], days:number) {
    const totalPoints = issues.length;
    const pointsPerDay = totalPoints / days;
    const distribution = [totalPoints];
    for (let i = 0; i < days - 1; i++) {
        distribution.push(totalPoints - pointsPerDay * (i + 1));
    }
    return distribution;
}

function calculatePointsBurned(issues: Issue[], xlabel: string[]): number[] {
    const pointsBurned: number[] = [];
    for (let i = 0; i < xlabel.length; i++) {
        if (i === 0) {
            pointsBurned.push(getPointsInDay(issues, xlabel[i], issues.length));
        } else {
            pointsBurned.push(getPointsInDay(issues, xlabel[i], pointsBurned[i - 1]));
        }
    }
    return pointsBurned;
}

export const PointsCalculator = (issues: Issue[], xlabel: string[]): number[] => {
    return calculatePointsBurned(issues, xlabel);
}

export { getDistributionPoints };