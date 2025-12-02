"use client";

import { useState } from "react";

export default function Home() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
        const res = await fetch(`http://localhost:8000/search?query=${query}`);

        if (!res.ok) {
        throw new Error("Erro ao consultar API");
        }

        const data = await res.json();
        setResult(data);
    } catch (err) {
        console.error(err);
        setResult({ error: "Erro ao buscar dados" });
    } finally {
        setLoading(false);
    }
    }

    return (
        <main style={{ padding: 40 }}>
        <h1>Scraper Frontend</h1>

        <div style={{ marginTop: 20 }}>
        <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
            padding: 10,
            width: 300,
            marginRight: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
            }}
        />

        <button
            onClick={handleSearch}
            disabled={loading}
            style={{
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            background: "#0070f3",
            color: "white",
            cursor: "pointer",
            }}
        >
            {loading ? "Buscando..." : "Buscar"}
        </button>
        </div>

        <div style={{ marginTop: 30 }}>
        <h2>Resultado:</h2>
        <pre
            style={{
            background: "#f5f5f5",
            padding: 20,
            borderRadius: 8,
            maxWidth: 600,
            }}
        >
            {result ? JSON.stringify(result, null, 2) : "Nenhum resultado"}
        </pre>
        </div>
    </main>
);
}
