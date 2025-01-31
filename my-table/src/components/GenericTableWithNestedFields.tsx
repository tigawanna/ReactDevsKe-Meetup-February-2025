import { PossibleNestedUnions } from "../types/nested_objects_union";
import { getNestedProperty } from "../utils/object";

type GenericItem = Record<string, string | number | object>&{id:string}
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: PossibleNestedUnions<T> & string;
};

interface GenericTableWithNestedFieldsProps<T extends GenericItem> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}


export function GenericTableWithNestedFields<T extends GenericItem>({
  data,
  columns,
}: GenericTableWithNestedFieldsProps<T>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Player ranks</h1>
      <h1 className="">Generic Tbale with Dynamic rows,columns and nestedc fields</h1>
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
                  if (column.accessor.includes(".")) {
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  if (typeof value === "object" ) {
                    return (
                      <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>
                    );
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
