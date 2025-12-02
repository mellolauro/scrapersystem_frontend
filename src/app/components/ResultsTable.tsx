export default function ResultsTable({ results }) {
    return (
        <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
                <tr className="bg-blue-600 text-white text-left">
                <th className="p-3">Software</th>
                <th className="p-3">Empresa</th>
                <th className="p-3">Score</th>
                <th className="p-3">Ações</th>
            </tr>
        </thead>

        <tbody>
            {results.map((r: any, i: number) => (
                <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="p-3">{r.software}</td>
                    <td className="p-3">{r.empresa}</td>
                    <td className="p-3 font-bold text-blue-600">{r.score}</td>
                    <td className="p-3">
                {r.url && (
                    <a 
                        href={r.url} 
                        target="_blank" 
                        className="text-blue-500 hover:underline"
                    >
                        Visitar
                    </a>
                    )}
                </td>
            </tr>
        ))}
    </tbody>
    </table>
);
}
