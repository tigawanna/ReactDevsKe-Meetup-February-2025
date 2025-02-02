import {  GenericTableWithNestedFields } from "./components/GenericPlayersTableWithNestedFields";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {


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
      <GenericTableWithNestedFields
      title="Players Table"
        description="list of payers without their stats"
        data={gooddata}
        columns={[
          { accessor: "id", label: "age" },
          { accessor: "name", label: "name" },
          { accessor: "age", label: "age" },
          { accessor: "rank", label: "rank" },
        ]}
      />
      <GenericTableWithNestedFields
      title="Players Table"
        description="list of payers with their stats"
        data={gooddata}
        columns={[
          { accessor: "id", label: "age" },
          { accessor: "name", label: "name" },
          { accessor: "age", label: "age" },
          { accessor: "rank", label: "rank" },
          { accessor: "stats.running", label: "running" },
          { accessor: "stats.jumping", label: "jumping" },
          { accessor: "stats.swimming", label: "swimming" },
          { accessor: "stats.weapons.blades.short", label: "katana" },
        ]}
      />
    </div>
  );
}
