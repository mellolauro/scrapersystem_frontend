export type Feature = {
    description: string;
    weight: number;
};

export type SearchRequest = {
    project_title: string;
    adherence_matrix: Feature[];
};

export type AdherenceDetail = {
    feature_description: string;
    is_present: boolean;
    score_contribution: number;
};

export type SystemResult = {
    title: string;
    company: string;
    link: string;
    total_score: number;
    ranking: number;
    adherence_breakdown: AdherenceDetail[];
};

// URL base da sua API (Deve corresponder ao seu Caddy/Docker Compose)
const API_BASE_URL = 'http://localhost'; 

export async function submitSearch(request: SearchRequest): Promise<SystemResult[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/search`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    return response.json();
}