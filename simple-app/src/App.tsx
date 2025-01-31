import { DynamicRowsAndColumnsTable } from "./components/DynamicRowsAndColumnsTable";
import { DynamicRowsTable } from "./components/DynamicRowsTable";
import { GenericTable } from "./components/GenericTable";
import { GenericTableWithNestedFields } from "./components/GenericTableWithNestedFields";
import { HardCodedTable } from "./components/HardCodedTable";
import { playerranks,playerranksWithSatas } from "./data/paley-data";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center p-10">
      <GenericTableWithNestedFields
        data={playerranksWithSatas}
        columns={[
          {
            label: "ID",
            accessor: "id",
          },
          {
            accessor: "name",
            label: "Name",
          },
          { accessor: "age", label: "Age" },
          { accessor: "rank", label: "Rank" },
          {accessor:"stats.wins",label:"Wins"},
          {accessor:"stats.losses",label:"Losses"},
        ]}
      />
        <DynamicRowsTable />
        <DynamicRowsAndColumnsTable />
        <GenericTable
          data={playerranks}
          columns={[
            {
              label: "ID",
              accessor: "id",
            },
            {
              accessor: "name",
              label: "Name",
            },
            { accessor: "age", label: "Age" },
            { accessor: "rank", label: "Rank" },
          ]}
        />
      <HardCodedTable />
    </div>
  );
}
