type TableColumn<T extends Record<string, string|number >> = {
  label: string;
  accessor: keyof T & string;
};
interface GenericTableProps<T extends Record<string, string|number >> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericTable<T extends Record<string, string|number >>({
  data,
  columns,
}: GenericTableProps<T>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Player ranks</h1>
      <h1 className="">Generic Tbale with Dynamic rows and columns</h1>
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
