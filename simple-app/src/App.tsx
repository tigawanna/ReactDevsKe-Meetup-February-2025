import { DynamicRowsAndColumnsTable } from "./components/DynamicRowsAndColumnsTable";
import { DynamicRowsTable } from "./components/DynamicRowsTable";
import { HardCodedTable } from "./components/HardCodedTable";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="w-full min-h-screen h-full justify-center items-center flex flex-col ">
      <div className="flex flex-col h-full items-center justify-center">
        <img src={viteLogo} className="h-52 w-52" alt="Vite logo" />
      </div>
      <DynamicRowsAndColumnsTable />
      <DynamicRowsTable />
      <HardCodedTable />
    </div>
  );
}

export default App;
