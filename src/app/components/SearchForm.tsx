// nextjs-app/src/app/components/SearchForm.tsx
"use client";

import { useState } from 'react';
import { Feature, SearchRequest, SystemResult, submitSearch } from '../lib/api';

// Definição de props para o componente
interface SearchFormProps {
    onResults: (results: SystemResult[]) => void;
    onLoading: (isLoading: boolean) => void;
    onError: (error: string | null) => void;
}

export default function SearchForm({ onResults, onLoading, onError }: SearchFormProps) {
    const [projectTitle, setProjectTitle] = useState('');
  // Inicializa a matriz com um critério padrão
    const [features, setFeatures] = useState<Feature[]>([{ description: '', weight: 1 }]); 

  // Função para adicionar um novo critério/feature
    const addFeature = () => {
    setFeatures([...features, { description: '', weight: 1 }]);
    };

  // Função para remover um critério/feature
    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

  // Função para atualizar os campos de descrição ou peso de um critério
    const handleFeatureChange = (index: number, field: keyof Feature, value: string | number) => {
        const newFeatures = features.map((feature, i) => {
        if (i === index) {
        return { ...feature, [field]: value };
        }
        return feature;
    });
    setFeatures(newFeatures);
    };

  // Função de submissão do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onError(null);
        onLoading(true);

    // Filtra features vazias e garante que o peso seja um número
    const validFeatures: Feature[] = features
        .filter(f => f.description.trim() !== '')
        .map(f => ({
        description: f.description.trim(),
        weight: typeof f.weight === 'string' ? parseInt(f.weight) : f.weight,
        }))
      .filter(f => !isNaN(f.weight) && f.weight > 0); // Remove pesos inválidos ou 0

    if (!projectTitle.trim() || validFeatures.length === 0) {
        onError("Por favor, preencha o Título do Projeto e adicione ao menos um Critério válido com Peso.");
        onLoading(false);
        return;
    }

    const requestBody: SearchRequest = {
        project_title: projectTitle,
        adherence_matrix: validFeatures,
    };

    try {
        const results = await submitSearch(requestBody);
                onResults(results);
        } catch (error) {
        console.error(error);
            onError("Não foi possível conectar ou processar a busca na API.");
            onResults([]); // Limpa resultados antigos em caso de erro
    } finally {
        onLoading(false);
    }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Detalhes da Busca e Matriz de Aderência</h2>

      {/* Campo de Título do Projeto */}
        <div>
            <label htmlFor="project_title" className="block text-sm font-medium text-gray-700">
                    Título do Projeto/Sistema
            </label>
        <input
            type="text"
            id="project_title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Ex: Sistema Gestão de RH"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
        </div>

      {/* Matriz de Aderência Dinâmica */}
        <h3 className="text-lg font-semibold text-gray-700 pt-2">Critérios de Aderência (Matriz)</h3>
            <div className="space-y-3">
            {features.map((feature, index) => (
                <div key={index} className="flex space-x-3 items-center">
            {/* Descrição */}
            <input
                type="text"
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                placeholder="Descrição da Funcionalidade"
                required
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            
            {/* Peso */}
            <input
                type="number"
                value={feature.weight}
                onChange={(e) => handleFeatureChange(index, 'weight', e.target.value)}
                min="1"
                max="10"
                placeholder="Peso (1-10)"
                required
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-center"
            />

            {/* Botão de Remover */}
            {features.length > 1 && (
                <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Remover Critério"
                >
                &times;
            </button>
            )}
        </div>
        ))}
    </div>

      {/* Botões de Ação */}
        <div className="flex space-x-4">
            <button
                type="button"
                onClick={addFeature}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            ➕ Adicionar Critério
        </button>
        <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            🔍 Iniciar Busca e Análise
        </button>
    </div>
    </form>
);
}