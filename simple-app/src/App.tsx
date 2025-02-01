import { DynamicRowsAndColumnsTable } from "./components/DynamicRowsAndColumnsTable";
import { DynamicRowsTable } from "./components/DynamicRowsTable";
import { GenericTableWithNestedFields, GenericTable } from "table-package";
import { RedSquare } from "table-package/redbox";
import { HardCodedTable } from "./components/HardCodedTable";
import { playerranks, playerranksWithSatas } from "./data/paley-data";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center p-10">
      <ThemeToggle />

      <RedSquare />

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
          { accessor: "stats.wins", label: "Wins" },
          { accessor: "stats.losses", label: "Losses" },
        ]}
      />
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
<DynamicRowsTable />
<DynamicRowsAndColumnsTable />
    </div>
  );
}
