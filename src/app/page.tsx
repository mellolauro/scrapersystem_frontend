// nextjs-app/src/app/page.tsx
"use client"; // Necessário pois usa hooks (useState)

import { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable'; // Vamos criar/editar este a seguir
import { SystemResult } from './lib/api';

export default function Home() {
    const [results, setResults] = useState<SystemResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Scraper Search & Matriz de Aderência
                </h1>
                <p className="text-gray-600">Encontre e classifique softwares com base nos seus critérios.</p>
            </header>
    
      {/* Formulário de Busca */}
            <SearchForm 
                onResults={setResults} 
                onLoading={setIsLoading} 
                onError={setError}
        />

      {/* Área de Status/Erro */}
        {error && (
            <div className="mt-6 p-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            {error}
        </div>
        )}
    
      {/* Área de Resultados */}
            <main className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {isLoading ? "Processando Resultados..." : "Resultados da Análise"}
                </h2>
        
        {isLoading && (
            <div className="flex items-center space-x-2 text-blue-600">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">...</svg>
                <span>Carregando e fazendo scraping...</span>
            </div>
        )}

        {!isLoading && results.length > 0 && (
            <ResultsTable results={results} />
        )}

        {!isLoading && results.length === 0 && !error && (
            <p className="text-gray-500">Nenhum resultado para exibir. Por favor, inicie uma busca.</p>
        )}
    </main>
    </div>
);
}