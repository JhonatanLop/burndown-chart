import { Octokit } from "@octokit/core";
import { Issue } from "../interfaces/Interfaces";

const token = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchIssues = async (gitRepo:string, gitOwner:string): Promise<Issue[]> => {
    if (!token) {
        console.error('GITHUB_TOKEN is not set');
        return [];
    }

    try {
        const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: gitOwner,
            repo: gitRepo,
            state: 'all',
            per_page: 100,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return response.data as Issue[];
    } catch (error) {
        console.error('Error fetching repository issues:', error);
        return [];
    }
};
