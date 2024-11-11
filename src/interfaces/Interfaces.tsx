export interface Issue {
    id: number;
    title: string;
    state: string;
    created_at: string;
    closed_at: string;
    url: string;
    milestone: null;
}

export interface Milestone {
    number: number;
    title: string;
}