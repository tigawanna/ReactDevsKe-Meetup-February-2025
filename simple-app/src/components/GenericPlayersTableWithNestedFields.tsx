import { PossibleNestedUnions } from "../types/nested_objects_union";
import { getNestedProperty } from "../utils/object";

type GenericItem = Record<string, string | number | object> & { id: string };
type TableColumn<T extends GenericItem> = {
  label: string;
  accessor: PossibleNestedUnions<T, 10> & string;
};

interface GenericTableProps<T extends GenericItem> {
  title:string;
  description?:string;
  columns: Array<TableColumn<T>>;
  data: Array<T>;
}

export function GenericTableWithNestedFields<T extends GenericItem>({
  title,
  description,
  data,
  columns,
}: GenericTableProps<T>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="test-sm">{description}</p>
      <div className="overflow-x-auto w-full max-w-[90%]">
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
                  // this line grabs the nested object and maps it to a <td>
                  if (column.accessor.includes(".")) {
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  //  we've already checked if the accessor is a nested object but typescript is not yet aware and 
                  // still thinks value is type string | number | objct at this point 
                  //  this part is only here to narrow the type or catch objects types that fell through
                  //  so that the value type on the section below is of type string | number
                  if (typeof value === "object") {
                    const nestedValue = getNestedProperty(row, column.accessor)
                    if(typeof nestedValue !== "string" || typeof nestedValue !== "number") {
                      // to avoid accidentally trying to renedr objects as react children
                      return <td key={column.accessor}>{JSON.stringify(nestedValue)}</td>;
                    }
                    return <td key={column.accessor}>{getNestedProperty(row, column.accessor)}</td>;
                  }
                  // value type is string| number , safe to render ina react td 
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


