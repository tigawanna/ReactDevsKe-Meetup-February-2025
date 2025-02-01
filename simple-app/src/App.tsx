import { MyGenericTable } from "./components/MyGenericTable";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center p-10">
      <ThemeToggle />
      <MyGenericTable/>
    </div>
  );
}
