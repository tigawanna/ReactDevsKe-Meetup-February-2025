type GenericItem = Record<string, string | number > & { id: string };
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: keyof T & string;
};
interface GenericTableProps<T extends GenericItem> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericPlayerstable<T extends GenericItem>({
  data,
  columns,
}: GenericTableProps<T>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Player ranks</h1>
      <p className="test-sm">Player Table with Dynamic rows and columns</p>
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
            {data.map((player) => (
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

//       <ThemeToggle />

//       <RedSquare />

//       <GenericTableWithNestedFields
//         data={playerranksWithSatas}
//         columns={[
//           {
//             label: "ID",
//             accessor: "id",
//           },
//           {
//             accessor: "name",
//             label: "Name",
//           },
//           { accessor: "age", label: "Age" },
//           { accessor: "rank", label: "Rank" },
//           { accessor: "stats.wins", label: "Wins" },
//           { accessor: "stats.losses", label: "Losses" },
//         ]}
//       />
//       <GenericTable
//         data={playerranks}
//         columns={[
//           {
//             label: "ID",
//             accessor: "id",
//           },
//           {
//             accessor: "name",
//             label: "Name",
//           },
//           { accessor: "age", label: "Age" },
//           { accessor: "rank", label: "Rank" },
//         ]}
//       />
//       <HardCodedTable />
// <DynamicRowsTable />
// <DynamicRowsAndColumnsTable />
