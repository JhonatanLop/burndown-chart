import { Issue } from "../components/Interfaces";

function findLastIssueClosedDay(issues:Issue[]){
    for (let i = issues.length - 1; i >= 0; i--) {
        if (issues[i].closed_at) {
            return issues[i].closed_at.split('T')[0].slice(-2);
        }
    }
}

function pointsBurnedInTheDay(issues: Issue[], day: string, pointsAlreadyBurned: number): number {
    let points = pointsAlreadyBurned;
    issues.forEach(issue => {
        if (issue.closed_at) {
            const closedDate = issue.closed_at.split('T')[0];
            const lastTwoChars = closedDate.slice(-2);
            console.log(lastTwoChars);
            if (lastTwoChars === day) {
                points -= 1;
            }
        }
    });

    return points;
}

function calculatePointsBurned(issues: Issue[], xlabel: string[]): number[] {
    const pointsBurned: number[] = [];
    for (let i = 0; i < xlabel.length; i++) {
        if (i === 0) {
            console.log(issues.length);
            pointsBurned.push(pointsBurnedInTheDay(issues, xlabel[i], issues.length));
        } else {
            pointsBurned.push(pointsBurnedInTheDay(issues, xlabel[i], pointsBurned[i - 1]));
        }
    }
    return pointsBurned;
}

export const PointsCalculator = (issues: Issue[], xlabel: string[]): number[] => {
    return calculatePointsBurned(issues, xlabel);
}