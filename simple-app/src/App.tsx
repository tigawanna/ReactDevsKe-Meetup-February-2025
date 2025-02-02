import { GenericPlayerstable } from "./components/GenericPlayersTable";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {

  const teamsRows = [
    { title: "Team1", id: 1, odds: 10 },
    { title: "Team2", id: 2, odds: 15 },
    { title: "Team3", id: 3, odds: 20 },
  ];
   const gooddata = [
     {
       id: "1",
       name: "John Doe",
       age: 30,
       rank: "Gold",
     },
   ];
   const baddata = [
     {
       name: "John Doe",
       age: 30,
       rank: "Gold",
     },
   ];
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center p-10">
      <ThemeToggle />
      <GenericPlayerstable data={gooddata} columns={[{ accessor: "id", label: "age" }]} />
    </div>
  );
}
