export interface Issue {
    id: number;
    title: string;
    state: string;
    created_at: string;
    closed_at: string;
    html_url: string;
    milestone: null;
}

export interface Milestone {
    number: number;
    title: string;
    closed_at: string;
    closed_issues: number;
    state: string;
    html_url: string;
    due_on: string;
    start_on: string;
    days: string[];
}