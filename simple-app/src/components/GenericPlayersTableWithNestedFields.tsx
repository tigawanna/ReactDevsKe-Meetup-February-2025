import { PossibleNestedUnions } from "../types/nested_objects_union";
import { getNestedProperty } from "../utils/object";

type GenericItem = Record<string, string | number | object>&{id:string}
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: PossibleNestedUnions<T,10> & string;
};

interface GenericTableProps<T extends GenericItem> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericPlayersTableWithNestedFields<T extends GenericItem>({
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
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => {
                  const value = row[column.accessor];
                  if (typeof value === "object") {
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  return <td key={column.accessor}>{value}</td>;
                })}
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
