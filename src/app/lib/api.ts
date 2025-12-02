export async function sendSearchRequest(payload: any) {
    const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return await res.json();
}

export async function getJobResults(job_id: string) {
    const res = await fetch(`http://localhost:8000/results/${job_id}`);
    return await res.json();
}
