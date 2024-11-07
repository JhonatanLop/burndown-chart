// import octokit from '@octokit/core';
import { Octokit } from "@octokit/core";
import { Issue } from "../components/Interfaces";

const token = process.env.GITHUB_TOKEN;

export const fetchIssues = async (): Promise<Issue[]> => {
    if (!token) {
        console.error('GITHUB_TOKEN is not set');
        return [];
    }

    try {
        const octokit = new Octokit({ auth: token });
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: 'projetoKhali',
            repo: 'api5back',
            state: 'all',

            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        return response.data as Issue[];
    } catch (error) {
        console.error('Error fetching repository issues:', error);
        return [];
    }
};
