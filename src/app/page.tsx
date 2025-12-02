"use client";

import { useState } from "react";

interface AdherenceItem {
  feature: string;
  weight: number;
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [matrix, setMatrix] = useState<AdherenceItem[]>([
    { feature: "", weight: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  function updateField(
    index: number, 
    field: keyof AdherenceItem,
    value: string | number
  ) {
    const clone = [...matrix];
    clone[index] = { ...clone[index], [field]: value};
    setMatrix(clone);
  }

  function addItem() {
    setMatrix([...matrix, { feature: "", weight: 1 }]);
  }

  function removeItem(index: number) {
    setMatrix(matrix.filter((_, i) => i !== index));
  }

  async function processScraping() {
    setLoading(true);

    try {
      const res = await fetch("http://localhost/api/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    matrix,
  }),
});


      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Título */}
        <h1 className="text-3xl font-bold">Sistema de Aderência & Scraper</h1>

        {/* Card principal */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">

          {/* Campo título do projeto */}
          <div>
            <label className="block text-sm font-medium">Título do Projeto</label>
            <input
              className="mt-2 w-full border rounded-lg p-3"
              placeholder="Ex: Sistema de Gestão de Projetos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Matriz de Aderência */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Matriz de Aderência</h2>

            {matrix.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 bg-gray-100 p-4 rounded-lg items-center"
              >
                <input
                  className="flex-1 border rounded-lg p-2"
                  placeholder="Requisito / funcionalidade"
                  value={item.feature}
                  onChange={(e) =>
                    updateItem(index, "feature", e.target.value)
                  }
                />

                <input
                  className="w-24 border rounded-lg p-2"
                  type="number"
                  min="1"
                  value={item.weight}
                  onChange={(e) =>
                    updateItem(index, "weight", Number(e.target.value))
                  }
                />

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}

            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Adicionar Linha
            </button>
          </div>

          {/* Botão executar */}
          <button
            onClick={processScraping}
            className="w-full bg-green-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Processando..." : "Executar Scraper & Calcular Score"}
          </button>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Resultado — Ranking</h2>

            <div className="space-y-4">
              {results.map((item, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.software_name}
                    </h3>
                    <p className="text-gray-600">{item.company}</p>
                  </div>

                  <span className="text-xl font-bold text-blue-600">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
