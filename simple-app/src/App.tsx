import { GenericPlayerstable } from "./components/GenericPlayersTable";
import { GenericPlayersTableWithNestedFields } from "./components/GenericPlayersTableWithNestedFields";
import { ThemeToggle } from "./components/ThemeToggle";
import { FlatObjectKeys } from "./types/nested_objects_union";

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
       stats:{
        running:20,
        jumping:10,
        swimming:30,
        weapons:{
          stars:10,
          katana:5
        }
       }
     },
     {
       id: "2",
       name: "Pedro",
       age: 30,
       rank: "Gold",
       stats:{
        running:20,
        jumping:10,
        swimming:30,
        weapons:{
          stars:1,
          katana:4,
          blades:{
            short:10,
            long:5
          }
        }
       }
     },
   ];


  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center p-10">
      <ThemeToggle />
      <GenericPlayersTableWithNestedFields
        data={gooddata}
        columns={[
          { accessor: "id", label: "age" },
          { accessor: "name", label: "name" },
          { accessor: "age", label: "age" },
          { accessor: "rank", label: "rank" },
          { accessor: "stats.running", label: "running" },
          { accessor: "stats.jumping", label: "jumping" },
          { accessor: "stats.swimming", label: "swimming" },
          { accessor: "stats", label: "swimming" },
          { accessor: "stats.weapons.blades.short", label: "katana" },
   
        ]}
      />
    </div>
  );
}
