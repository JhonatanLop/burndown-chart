import { Issue, Milestone } from "../interfaces/Interfaces";
import { fetchIssues } from "./GithubIssuesFetcher";

function findAllIssues(response: Issue[]) {
    if (!response) {
        return [];
    }

    let issues: Issue[] = [];
    // Com nosso padrão de commit, não teremos issues com título contendo ":", apenas pull requests
    for (let i = 0; i < response.length; i++) {
        const obj = response[i];
        if (obj.title.includes(":")) {
            continue;
        }
        issues.push(obj);
        if (obj.milestone != null) {
            console.log(obj);
        }
    }
    return issues;
}

function dividIssuesBySprint(issues:Issue[]) {
    let sprint3: Issue[] = [];

    for (let i = 0; i < issues.length; i++) {
        const obj = issues[i];
        if (obj.milestone === null) {
            continue;
        }

        const milestone: Milestone = obj.milestone; // Use a interface Milestone

        if (milestone === null) {
            continue;
        } else if (milestone.number === 1) {
            sprint3.push(obj);
        }
    }
    return sprint3;
}

export const getIssues = async (): Promise<Issue[]> => {
    const backend = await fetchIssues('api5back','projetoKhali');
    const frontend = await fetchIssues('api5front','projetoKhali');

    const issuesBack = findAllIssues(backend);
    const issuesFront = findAllIssues(frontend);
    const issuesBySprint = dividIssuesBySprint(issuesBack.concat(issuesFront));
    
    return issuesBySprint;
};
