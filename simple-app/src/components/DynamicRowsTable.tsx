import { playerranks } from "../data/paley-data";

export function DynamicRowsTable() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Player ranks</h1>
      <h1 className="">Dynamic rows</h1>
      <div className="overflow-x-auto w-full max-w-[70%]">
        <table className="table table-zebra table-xl">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Age</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {playerranks.map((player) => (
              <tr key={player.id}>
                <th>{player.id}</th>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
