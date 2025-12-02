'use client';

import { useState } from "react";
import { sendSearchRequest, getJobResults } from "../lib/api";

export default function SearchForm({ setLoading, setResults }) {
    const [title, setTitle] = useState("");
    const [requirements, setRequirements] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

    setLoading(true);
    setResults([]);

    const payload = {
        title,
        requirements: requirements.split("\n").map(r => r.trim()).filter(Boolean)
    };

    const { job_id } = await sendSearchRequest(payload);

    // Polling até ter resultado
    let finished = false;

    while (!finished) {
        await new Promise(r => setTimeout(r, 2000));

        const data = await getJobResults(job_id);

        if (data.ready) {
        setResults(data.results);
        finished = true;
        }
    }

    setLoading(false);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl"
    >
        <label className="block text-lg font-semibold text-gray-700 mb-2">
            Título do Projeto
        </label>
        <input
            type="text"
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Ex: Sistema de gestão de projetos"
            value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-lg font-semibold text-gray-700 mb-2">
        Matriz de Aderência (1 requisito por linha)
        </label>
        <textarea
        className="w-full p-3 border rounded-md h-40"
        placeholder="Ex: Controle de tarefas&#10;Relatórios automáticos&#10;Integração com ERP"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        />

        <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
        >
        Buscar Softwares
        </button>
    </form>
    );
}
