import { Issue, Milestone } from "../components/Interfaces";
import { fetchIssues } from "./githubService";

function findAllIssues(response: Issue[]) {
    // se a resposta for vazia, retorna um array vazio
    if (!response) {
        return [];
    }

    let issues: Issue[] = [];
    // verifica se o título da issue tem ":". Se tiver não adiciona no array
    for (let i = 0; i < response.length; i++) {
        const obj = response[i];
        if (obj.title.includes(":")) {
            continue;
        }
        issues.push(obj);
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
        // } else if (milestone.number === 3) {
        //     sprint1.push(obj);
        // } else if (milestone.number === 4) {
        //     sprint2.push(obj);
        } else if (milestone.number === 1) {
            sprint3.push(obj);
        }
    }
    return sprint3;
}

export const getIssues = async (): Promise<Issue[]> => {
    // pega as issues da resposta
    const backend = await fetchIssues('api5back','projetoKhali');
    const frontend = await fetchIssues('api5front','projetoKhali');

    const issuesBack = findAllIssues(backend);
    const issuesFront = findAllIssues(frontend);
    const issuesBySprint = dividIssuesBySprint(issuesBack.concat(issuesFront));
    
    return issuesBySprint;
};
