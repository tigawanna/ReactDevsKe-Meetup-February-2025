import { playerranks } from "../data/paley-data";

export function DynamicRowsAndColumnsTable() {
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Age", accessor: "age" },
    { label: "Rank", accessor: "rank" },
  ] as const
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Player ranks</h1>
      <h1 className="">Dynamic rows and columns</h1>
      <div className="overflow-x-auto w-full max-w-[70%]">
        <table className="table table-zebra table-xl">
          {/* head */}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {playerranks.map((player) => (
              <tr key={player.id}>
                {columns.map((column) => (
                  <td key={column.accessor}>{player[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
