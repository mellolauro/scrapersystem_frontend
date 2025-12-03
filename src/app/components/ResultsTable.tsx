import { useState } from 'react';
import { SystemResult } from '../lib/api';

interface ResultsTableProps {
    results: SystemResult[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  // Estado para controlar qual resultado está expandido para mostrar detalhes
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md bg-white">
            <div className="flex justify-between items-center">
            <div className="flex-1 space-y-1">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                Ranking: #{result.ranking}
                </span>
                    <h3 className="text-xl font-semibold text-gray-800">{result.title}</h3>
                    <p className="text-sm text-gray-600">Empresa: **{result.company}**</p>
                <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-700 text-sm"
                >
                Link: {result.link}
            </a>
        </div>

            <div className="text-right">
                <p className="text-4xl font-extrabold text-green-600">{result.total_score}%</p>
                <p className="text-sm text-gray-500">Pontuação de Aderência</p>
            </div>
        </div>
            
          {/* Botão de Expansão para Detalhes */}
            <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
            {expandedIndex === index ? '▲ Ocultar Detalhes de Aderência' : '▼ Ver Detalhes de Aderência'}
        </button>

          {/* Detalhes de Aderência (Expansível) */}
            {expandedIndex === index && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                <h4 className="text-md font-semibold mb-2">Detalhes da Pontuação (Critério x Contribuição)</h4>
                <ul className="space-y-1">
                {result.adherence_breakdown.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex justify-between text-sm text-gray-700">
                    <span className={`font-medium ${detail.is_present ? 'text-green-600' : 'text-red-600'}`}>
                        {detail.is_present ? '✅ Atende' : '❌ Não Atende'} - {detail.feature_description}
                    </span>
                    <span className="font-mono text-xs">
                        +{detail.score_contribution.toFixed(2)} pontos
                    </span>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    ))}
    </div>
);
}