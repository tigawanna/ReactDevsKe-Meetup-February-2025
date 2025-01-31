import { DynamicRowsAndColumnsTable } from "./components/DynamicRowsAndColumnsTable";
import { DynamicRowsTable } from "./components/DynamicRowsTable";
import { GenericTable } from "./components/GenericTable";
import { GenericTableWithNestedFields } from "./components/GenericTableWithNestedFields";
import { HardCodedTable } from "./components/HardCodedTable";
import { playerranks, playerranksWithSatas } from "./data/paley-data";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="w-full min-h-screen h-full justify-center gap-10 items-center flex flex-col ">
      <div className="flex flex-col h-full items-center justify-center">
        <img src={viteLogo} className="h-52 w-52" alt="Vite logo" />
      </div>
      <GenericTableWithNestedFields
        data={playerranksWithSatas}
        columns={[
          { label: "ID", accessor: "id" },
          { label: "Name", accessor: "name" },
          { label: "Age", accessor: "age" },
          { label: "Rank", accessor: "rank" },
          { label: "wins", accessor: "stats.wins" },
          { label: "losses", accessor: "stats.losses" },
        ]}
      />
      <GenericTable
        data={playerranks}
        columns={[
          { label: "ID", accessor: "id" },
          { label: "Name", accessor: "name" },
          { label: "Age", accessor: "age" },
          { label: "Rank", accessor: "rank" },
        ]}
      />
      <DynamicRowsAndColumnsTable />
      <DynamicRowsTable />
      <HardCodedTable />
    </div>
  );
}

export default App;
